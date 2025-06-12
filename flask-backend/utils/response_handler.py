from flask import Response
import json

def success_response(status=True, message="Success", data=None):
    response = {
        "status": status,
        "message": message,
        "data": data
    }
    return Response(json.dumps(response), status=200, mimetype='application/json')

def error_response(message="Error", status_code=400):
    response = {
        "status": False,
        "message": message,
        "data": None
    }
    return Response(json.dumps(response), status=status_code, mimetype='application/json')
