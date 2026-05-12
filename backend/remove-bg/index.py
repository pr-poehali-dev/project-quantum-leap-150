"""
Удаляет бирюзовый фон из изображения карты и загружает результат в S3.
Возвращает публичный URL обработанного PNG с прозрачным фоном.
"""
import os
import io
import json
import boto3
import urllib.request
from PIL import Image
import numpy as np


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    # Загружаем исходное изображение
    img_url = 'https://cdn.poehali.dev/projects/741a384e-7334-4a38-b0e5-a037d7365f18/bucket/4eaed915-c1f0-4f49-8c08-f5cb00ca4f23.png'
    with urllib.request.urlopen(img_url) as response:
        img_data = response.read()

    img = Image.open(io.BytesIO(img_data)).convert('RGBA')
    data = np.array(img)

    r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]

    # Бирюзовый/синий фон: R < 100, G > 150, B > 180
    cyan_mask = (r.astype(int) < 100) & (g.astype(int) > 140) & (b.astype(int) > 170)

    # Делаем бирюзовые пиксели прозрачными
    data[cyan_mask] = [0, 0, 0, 0]

    result_img = Image.fromarray(data)

    buf = io.BytesIO()
    result_img.save(buf, format='PNG')
    buf.seek(0)

    # Загружаем в S3
    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )

    key = 'map-no-bg.png'
    s3.put_object(
        Bucket='files',
        Key=key,
        Body=buf.read(),
        ContentType='image/png'
    )

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'url': cdn_url})
    }
