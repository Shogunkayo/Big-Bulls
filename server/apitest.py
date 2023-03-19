

private_key = "5KfBcvjtZHgvx4UTGwrLhpvCJDGKL4BhcwCuK7bu9JpfVGuf1VV"


def check_wif(key):
    if (key[0]=='5' and len(key)==51):
        return 1
    elif ((key[0] == 'L' or key[0] == 'K') and len(key) == 51):
        return 2
    else:
        return 0

print(check_wif(private_key))


