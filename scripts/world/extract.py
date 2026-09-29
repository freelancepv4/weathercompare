import json, sys
d = json.load(open(sys.argv[1]))
t = ''.join(x['text'] for x in d)
s, _ = json.JSONDecoder().raw_decode(t)
tag = sys.argv[2]
a = s.index(tag + 'START\n') + len(tag) + 6
b = s.index('\n' + tag + 'END')
open(sys.argv[3], 'w').write(s[a:b])
print(s[a:b].count('\n') + 1, 'rows')
