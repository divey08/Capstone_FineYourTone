from PIL import Image
import numpy as np
import io

def preprocess_image(image_bytes):
    """
    Konversi gambar ke array fitur (misalnya flatten).
    Sesuaikan dengan cara kamu latih modelnya.
    """
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    image = image.resize((64, 64))  # Sesuaikan dengan training
    image_array = np.array(image).flatten()  # Jadi 1D array
    return image_array.reshape(1, -1)  # Sesuai format input model