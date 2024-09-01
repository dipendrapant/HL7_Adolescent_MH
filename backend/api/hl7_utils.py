from hl7apy.core import Message


def generate_hl7_message(score, patient_id, patient_name, patient_gender, assessment_date):
    # Create a basic HL7 ORU_R01 message
    msg = Message("ORU_R01")

    # Populate the message with the MSH segment
    msg.msh.msh_3 = "DjangoApp"  # Sending application
    msg.msh.msh_4 = "HealthcareProvider"  # Sending facility
    msg.msh.msh_7 = assessment_date  # Date and time of the message
    msg.msh.msh_9 = "ORU^R01"  # Message type
    msg.msh.msh_10 = "12345"  # Message control ID
    msg.msh.msh_11 = "P"  # Processing ID
    msg.msh.msh_12 = "2.5"  # HL7 Version

    # Create the PID segment for patient information
    pid = msg.add_segment("PID")
    pid.pid_3 = patient_id  # Patient ID
    pid.pid_5 = patient_name  # Patient Name
    pid.pid_8 = patient_gender  # Patient Gender

    # Create the OBR segment for the observation request
    obr = msg.add_segment("OBR")
    obr.obr_4 = "PHQ9"  # Observation ID
    obr.obr_7 = assessment_date  # Date and time of the observation request

    # Create the OBX segment for the observation result
    obx = msg.add_segment("OBX")
    obx.obx_1 = "1"
    obx.obx_2 = "NM"  # Numeric data type
    obx.obx_3 = "PHQ9_1"  # Observation identifier
    obx.obx_5 = score  # Assessment score

    return msg.to_er7()  # Return the message in ER7 format (HL7 standard)

