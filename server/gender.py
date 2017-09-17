from gender_guesser.detector import Detector

d = Detector()

def detect(name):
    first_name = name.split()[0]
    return d.get_gender(first_name)

def is_male(name):
    gender = detect(name)
    if gender == "male" or gender == "mostly_male":
        return True
    else:
        return False

def is_female(name):
    gender = detect(name)
    if gender == "female" or gender == "mostly_female":
        return True
    else:
        return False
            
