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
    lucky_triples = 0
    nodes = {}
    for crt_index in range(0, len(l)):
        current_term = l[crt_index]
        validate_list_element(current_term)

        if not current_term in nodes:
             nodes[current_term] = {}
        
        current_term_initial_divisors = list(nodes[current_term])

        for prev_index in range(0, crt_index)[::-1]:
            prev_term = l[prev_index]

            if current_term % prev_term == 0:
                if not prev_term in nodes[current_term]:
                    if current_term != prev_term:
                        lucky_triples += len(nodes[prev_term].keys())
                    else:
                        lucky_triples += len(current_term_initial_divisors)

                    nodes[current_term][prev_term] = 1
                elif nodes[current_term][prev_term] == 1:
                    lucky_triples += 1
                    nodes[current_term][prev_term] += 1
                        
    
        if not current_term in nodes:
            nodes[current_term] = {}
    return lucky_triples


print(solution([1, 1,]))
"""
21, 21, 4, 7, 4, 7, 4, 7, 3, 3, 3, 21, 1, 3, 1, 1, 21
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

