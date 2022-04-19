
class Style:
    def __init__(self):
        pass

    # Bright Green
    @staticmethod
    def instruction(message):
        return "\033[1;32;40m {0}".format(message)

    # Bright Red
    @staticmethod
    def warning(message):
        return "\033[1;31;40m {0}".format(message)

    # Bright Cyan
    @staticmethod
    def result(message):
        return "\033[1;36;40m {0}".format(message)

    # Bright Magenta
    @staticmethod
    def info(message):
        top_bar = len(message) + 4

        return "\033[1;35;40m {0}".format(message)

    '''
    def styledOutput(message, type):
        # Bright Green
        if (type == 'instruction'):
            print("\033[1;32;40m {0}".format(message))
        # Bright Red
        if (type == 'warning'):
            print("\033[1;31;40m {0}".format(message))
        # Bright Cyan
        if (type == 'result'):
            print("\033[1;36;40m {0}".format(message))
    '''