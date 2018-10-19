import codecs
import json
import re


filepath = "./data/raw/watch-history.html"
with codecs.open(filepath, 'r') as html_ref:
    html = html_ref.read()

html_exp = "<a[\s]+([^>]+)>((?:.(?!\<\/div\>))*.)</div>"
regex = re.compile(html_exp)
parsed_html = regex.findall(html)

history_list = []

for video in parsed_html:

    url, name_time = video

    # Clean url
    url_exp = '"(.*?)"'
    regex = re.compile(url_exp)
    url = regex.findall(url)
    if url:
        url = url[0]
    else:
        url = None

    # Clean title
    title_exp = '^(.*?)\</a>' # need to exclude </a>
    regex = re.compile(title_exp)
    title = regex.findall(name_time)
    if title:
        title = title[0]
    else:
        title = None

    # Clean timestamp
    timestamp_exp = "(?:.*?<br>){2}(.*)(?=EDT)"
    regex = re.compile(timestamp_exp)
    timestamp = regex.findall(name_time)
    if timestamp:
        timestamp = timestamp[0]
    else:
        timestamp = None
    
    video_entry = {
        "url":url,
        "title":title,
        "timestamp":timestamp
    }

    history_list.append(video_entry)

# print history_list

writepath = './data/parsed/history.json'
with open(writepath, 'w') as outfile:
    for entry in history_list:
        json.dump(entry, outfile)

print("Wrote",writepath)