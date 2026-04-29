from django.core.management.base import BaseCommand
from store.models import Product
import os

class Command(BaseCommand):
    help = 'Seed products from repository images (uses image filenames)'

    def handle(self, *args, **options):
        repo_images = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '..', '..', 'images')
        repo_images = os.path.abspath(repo_images)
        if not os.path.isdir(repo_images):
            self.stdout.write(self.style.ERROR('Images folder not found: %s' % repo_images))
            return

        created = 0
        for fname in os.listdir(repo_images):
            if not fname.lower().endswith(('.jpg', '.jpeg', '.png', '.jfif', '.avif')):
                continue
            name = os.path.splitext(fname)[0]
            price = 1000
            Product.objects.get_or_create(name=name, defaults={'price': price, 'image': f'images/{fname}'})
            created += 1

        self.stdout.write(self.style.SUCCESS('Seeded %d products' % created))
