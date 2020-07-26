files = ['lvl{}.txt'.format(i) for i in range(1, 5)]

line_dict = {}
for filepath in files:
    with open(filepath, 'r') as f_in:
        lines = set(l.strip() for l in f_in.readlines())
    line_dict[filepath] = lines
   
base = line_dict[files[0]]
for fp in files[1:]:
    lines = line_dict[fp]
    new_lines = lines - base
    with open(fp + 'clean', 'w') as f_out:
        f_out.write('\n'.join(list(new_lines)))

