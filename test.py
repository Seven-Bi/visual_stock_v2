import json


def recur_foo(num, l, n_d):
	if num <= 0:
		return n_d	

	t_l = []
	key = l[num-1]['b']

	for i in l:
		if i['pm'] == key:
			t_l.append(i['b'])
	print(t_l)
	n_d[key] = t_l
	num -= 1

	return recur_foo(num, l, n_d)


with open('data.json') as json_file:
	data = json.load(json_file)
	d = data['data']

	data_l = d
	dd = {}
	num = len(data_l)
	recur_foo(num, data_l, dd)