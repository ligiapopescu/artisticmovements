def validate_list(l):
    minLength = 2
    maxLength = 2000
    listLengthErrorText = 'List size should be greater than ' + \
        str(minLength) + ' and lower than ' + str(maxLength) + "!"
    if not isinstance(l, list):
        raise Exception('Input should be a list!')

    if len(l) < minLength or len(l) > maxLength:
        raise Exception(listLengthErrorText)


def validate_list_element(element):
    minValue = 1
    maxValue = 999999
    valueErrorText = 'All list elements should be greater than ' + \
        str(minValue) + ' and lower than ' + str(maxValue) + "!"

    if element < minValue or element > maxValue:
        raise Exception(valueErrorText)


def solution(l):
    validate_list(l)
    
    """lucky_triples = 0
    multiples = {}
    
    for i in range(0, len(l)):
        if not l[i] in multiples:
            multiples[l[i]] = []

        for j in range(i, len(l)):
            if l[j]%l[i] == 0:
                multiples[l[i]].append(l[j])"""
    

    count_multiples = [0]*len(l)
    lucky_triples = 0

    for k in range(0, len(l)):
        for j in range(0, k):
            if l[k]%l[j] == 0:
                count_multiples[k] += 1
                lucky_triples += count_multiples[j]
    return lucky_triples


print(solution([1, 1, 1]))
"""
21, 21, 4, 7, 4, 7, 4, 7, 3, 3, 3, 21
21 21 21
4 4 4
7 7 7
7 7 21
3 3 21
3 3 3

2, 4, 4, 2, 2, 4
2 4 4
2 2 4
2 2 2
4 4 4

4, 3, 2, 8, 2, 4, 8
4 8 8
4 4 8
2 8 8
2 2 4
2 2 8

1 6 6
1 3 9
1 3 6
1 3 27
1, 6, 3, 6, 27, 9 -> 4


1, 2, 1, 2, 1, 2 -> 4
1 2 2
1 1 2
1 1 1
2 2 2

2, 2, 2, 3, 3, 3, 6 -> 4
2 2 2
2 2 6
3 3 3
3 3 6

1, 2, 4, 1, 2, 4 -> 7
1 2 4
1 2 2
1 4 4
1 1 2
1 1 4
2 2 4
2 4 4
"""

