#!/usr/bin/bash

echo "Building RSS feed"

search_dir=./docs/de/blog
rss_file=./generated/feed.xml

# Get list of blog articles in articles.txt --------------------------------------------------------------------------
echo "Searching blog articles"
for file in "$search_dir"/????-??-??.md
do
    echo $file >> articles.txt
done

# Create RSS feed-----------------------------------------------------------------------------------------------------
echo '<?xml version="1.0" encoding="utf-8"?>' > $rss_file
echo '<rss version="2.0">' >> $rss_file
echo '  <channel>' >> $rss_file
echo '    <title>Retro Carnage-Blog</title>' >> $rss_file
echo '    <link>https://www.retro-carnage.net/de/</link>' >> $rss_file
echo '    <description>Entwickler-Blog des Spiels Retro Carnage</description>' >> $rss_file
echo '    <language>de-de</language>' >> $rss_file
echo '    <copyright>Thomas Werner</copyright>' >> $rss_file
pubDate=$(date -R)
echo "    <pubDate>$pubDate</pubDate>" >> $rss_file
echo '    <image>' >> $rss_file
echo '      <url>https://www.retro-carnage.net/de/media/logo.jpg</url>' >> $rss_file
echo '      <title>Retro Carnage-Logo</title>' >> $rss_file
echo '      <link>https://www.retro-carnage.net/de/</link>' >> $rss_file
echo '    </image>' >> $rss_file

articleNum=0
for articleFile in $(cat articles.txt | tac) 
do
    echo "Adding blog article $articleFile"
    lineNum=0    
    articleTitle=""
    articleDescription=""

    articleFileRel=${articleFile:15}
    articleFileRel=$(echo "${articleFileRel//.md/}")
    articleLink="https://www.retro-carnage.net/de/blog/${articleFileRel}/"
    articleDate=$(date --date $articleFileRel -R)

    while IFS= read -r line
    do
        if [[ "$lineNum" -eq 0 ]]
        then
            articleTitle="${line:2}"
        elif [[ "$lineNum" -eq 2 ]]
        then
            lineLen=${#line} 
            if [[ "$lineLen" -gt 240 ]]
            then
                articleDescription="${line:0:240}..."
            else
                articleDescription="$line"
            fi
            articleDescription=$(sed 's/\[\([^\]*\)\](\([^)]*\))/\1/g' <<< $articleDescription)
        fi
        lineNum=$((lineNum+1))
    done < "$articleFile"

    echo '    <item>' >> $rss_file
    echo "      <title>$articleTitle</title>" >> $rss_file
    echo "      <description><![CDATA[$articleDescription]]></description>" >> $rss_file
    echo "      <link>$articleLink</link>" >> $rss_file
    echo "      <author>Thomas Werner, website@retro-carnage.net</author>" >> $rss_file
    echo "      <guid>$articleLink</guid>" >> $rss_file
    echo "      <pubDate>$articleDate</pubDate>" >> $rss_file
    echo "    </item>" >> $rss_file

    articleNum=$((articleNum+1))
done

echo '  </channel>' >> $rss_file
echo '</rss>' >> $rss_file

rm articles.txt
