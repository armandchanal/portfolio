import urllib.request
import os

os.makedirs('img/photos', exist_ok=True)
urls = [
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80',
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80' # music
]

names = ['paysage1.jpg', 'paysage2.jpg', 'paysage3.jpg', 'music.jpg']

for i, url in enumerate(urls):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response, open(f'img/photos/{names[i]}', 'wb') as out_file:
        out_file.write(response.read())

print("Images downloaded")
