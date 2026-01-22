import cv2
import numpy as np
from utils import order_points, four_point_transform


def test_order_points_returns_consistent_order():

    pts = np.array([
        [200, 300],
        [50, 50],
        [300, 50],
        [50, 300]
    ], dtype="float32")

    ordered = order_points(pts)

    assert np.array_equal(ordered[0], [50, 50])
    assert np.array_equal(ordered[1], [300, 50])
    assert np.array_equal(ordered[2], [200, 300]) or ordered[2][1] >= ordered[3][1]
    assert np.array_equal(ordered[3], [50, 300])


def test_four_point_transform_output_shape():

    image = np.zeros((500, 500, 3), dtype=np.uint8)

    pts = np.array([
        [100, 100],
        [400, 80],
        [420, 420],
        [80, 400]
    ], dtype="float32")

    warped = four_point_transform(image, pts)

    assert warped is not None
    assert warped.shape[0] > 0
    assert warped.shape[1] > 0


def test_four_point_transform_preserves_content():

    image = np.full((300, 300, 3), 255, dtype=np.uint8)

    cv2.rectangle(image, (50, 50), (250, 250), (0, 0, 0), 3)

    pts = np.array([
        [50, 50],
        [250, 50],
        [250, 250],
        [50, 250]
    ], dtype="float32")

    warped = four_point_transform(image, pts)
    assert np.mean(warped) < 250
