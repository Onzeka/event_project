import click
from flask import Blueprint
from faker import Faker

from PIL import Image
import urllib.request as request
import io


from api import db
from api.models import Event,User

fake = Blueprint('fake', __name__)
faker = Faker()



@fake.cli.command("create-users")
@click.argument('number',type=int)
def create_users(number:int)-> None:
    for i in range(number):
        
        user = create_user()

        db.session.add(user)
    db.session.commit()

@fake.cli.command("create-events")
@click.argument('number',type=int)
def create_events(number:int):
    for i in range(number):
        event = Event()

def create_user():
    user = User(
            username = faker.user_name(),
        )
    img_path = f'{user.images_dir}/profile.jpg'
    user.picture_profile_link = img_path
    hex_img = request.urlopen('https://picsum.photos/600/600').read()
    img = Image.open(io.BytesIO(hex_img))
    img.save(img_path)
    return user