import json
from datetime import datetime

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .hl7_utils import generate_hl7_message  

import logging

logger = logging.getLogger(__name__)

ALLOWED_GENDERS = ["Male", "Female", "LGBTQ", "Others"]

@csrf_exempt
def assessment_view(request):
    if request.method == 'POST':
        try:
            logger.debug("Received POST request")
            data = json.loads(request.body)
            logger.debug(f"Request data: {data}")
            phq9_score = data.get('phq9_score')
            patient_id = data.get('patient_id')
            patient_name = data.get('patient_name')
            patient_gender = data.get('patient_gender')

            # Validate inputs
            if not phq9_score or not phq9_score.isdigit() or not (0 <= int(phq9_score) <= 27):
                logger.error("Invalid PHQ-9 score")
                return JsonResponse({"error": "PHQ-9 score must be an integer between 0 and 27"}, status=400)

            if not patient_id or not patient_name or patient_gender not in ALLOWED_GENDERS:
                logger.error("Invalid patient information")
                return JsonResponse({"error": "All patient information fields are required and gender must be valid"}, status=400)

            # Get the current date and time
            assessment_date = datetime.now().strftime("%Y%m%d%H%M%S")

            # Generate the HL7 message with additional patient information
            hl7_message = generate_hl7_message(phq9_score, patient_id, patient_name, patient_gender, assessment_date)

            return JsonResponse({"hl7_message": hl7_message})

        except json.JSONDecodeError:
            logger.error("Invalid JSON")
            return JsonResponse({"error": "Invalid JSON"}, status=400)
    logger.error("Invalid request method")
    return JsonResponse({"error": "Invalid request method"}, status=405)



