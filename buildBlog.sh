#!/usr/bin/bash

search_dir=./docs/de/blog

# Get list of blog articles in articles.txt ----------------------------------------------------------------------------
echo "Searching blog articles"
for file in "$search_dir"/*.md
do
  echo $file >> articles.txt
done

# Create blog page -----------------------------------------------------------------------------------------------------
echo "# Blog" > "$search_dir/index.md"
articleNum=0
for articleFile in $(cat articles.txt | tac) 
do
    echo "Processing $articleFile"
    if [[ "$articleNum" -lt 10 ]]   # first 10 articles will be placed directly on blog page ---------------------------
    then
        lineNum=0
        while IFS= read -r line
        do
            if [[ "$lineNum" -eq 0 ]]
            then
                headline="${line:2}"                
                headline="## [${headline}](./${articleFile:15})" 
                echo "" >> "$search_dir/index.md"
                echo "$headline" >> "$search_dir/index.md"
            else
                echo "$line" >> "$search_dir/index.md"
            fi
            lineNum=$((lineNum+1))
        done < "$articleFile"
    else                            # Older articles will be linked on blog archive page
        if [[ "$articleNum" -eq 10 ]]
        then
            echo "$line" >> "$search_dir/index.md"
            echo "Weitere Artikel befinden sich im [Blog-Archiv](./blog-archive.md)" >> "$search_dir/index.md"
            
            echo "# Blog-Archiv" > "$search_dir/blog-archive.md"
            echo "" >> "$search_dir/blog-archive.md"
        fi

        lineNum=0
        while IFS= read -r line
        do
            if [[ "$lineNum" -eq 0 ]]
            then
                headline="${line:2}"
                headline="${headline::-1}"
                headline="## [${headline}](./${articleFile:5})"
                echo "$headline" >> "$search_dir/blog-archive.md"
                echo "" >> "$search_dir/blog-archive.md"
            elif [[ "$lineNum" -eq 2 ]]
            then
                lineLen=${#line} 
                if [[ "$lineLen" -gt 240 ]]
                then
                    echo "${line:0:240}..." >> "$search_dir/blog-archive.md"
                    echo "" >> "$search_dir/blog-archive.md"
                else
                    echo "$line" >> "$search_dir/blog-archive.md"
                    echo "" >> "$search_dir/blog-archive.md"
                fi
            fi
            lineNum=$((lineNum+1))
        done < "$articleFile"
    fi

  articleNum=$((articleNum+1))
done

rm articles.txt