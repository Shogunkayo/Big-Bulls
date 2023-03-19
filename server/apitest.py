

private_key = "5Kb8kLf9zgWQnogidDA76MzPL6TsZZY36hWXMssSzNydYXYB9KF"


def check_wif(key):
    if (key[0]=='5' and len(key)==51):
        return 1
    elif ((key[0] == 'L' or key[0] == 'K') and len(key) == 51):
        return 2
    else:
        return 0

print(check_wif(private_key))


