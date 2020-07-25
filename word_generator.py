import pygtrie as trie
import json

HOME_ROW = ['d', 's', 't', 'n', 'a', 'e', 'o', 'h']
HOME_ROW_BONUS = ['d', 's', 't', 'n', 'a', 'e', 'o', 'h', 'r', 'i']
CFKLMPUV = ['d', 's', 't', 'n', 'a', 'e', 'o', 'h', 'r', 'i', 'c', 'f', 'k', 'l', 'm', 'p', 'u', 'v']
BGJQWXYZ = ['d', 's', 't', 'n', 'a', 'e', 'o', 'h', 'r', 'i', 'b', 'g', 'j', 'q', 'w', 'x', 'y', 'z']

WORD_PATH = 'words.txt'

def download_words(url):
    with open(WORD_PATH, 'r') as f:
        words = [l.strip() for l in f.readlines()]
    return words

def generate_trie(word_list):
    t = trie.CharTrie()
    for word in word_list:
        t[word] = True
    return t

def generate_words(char_list, dict_trie):
   pass

def serialize_trie(input_trie, output_path='trie.json'):
    json_str = json.dumps(input_trie._root.__getstate__())
    with open(output_path, 'w') as f:
        f.write(json_str)

def load_trie(input_path='trie.json'):
    with open(input_path, 'r') as f:
        json_str = f.read(f)
    t = trie.CharTrie()
    t._root.__setstate__(json.loads(json_str))


if __name__ == '__main__':
    words = download_words(WORD_PATH)
    word_trie = generate_trie(words)
    
    with open('trie.json', 'w') as f:
        f.write(json_str)
