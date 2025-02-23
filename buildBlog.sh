#!/usr/bin/bash

echo "Building blog pages"

search_dir=./docs/de/blog

# Get list of blog articles in articles.txt ----------------------------------------------------------------------------
echo "Searching blog articles"
for file in "$search_dir"/????-??-??.md
do
  echo $file >> articles.txt
done

# Create blog page -----------------------------------------------------------------------------------------------------
echo "---" > "$search_dir/index.md"
echo "description: Ankündigungen, Aktuelles, und Spannendes aus von den Projekt-Mitgliedern" >> "$search_dir/index.md"
echo "title: Projekt-Blog" >> "$search_dir/index.md"
echo "---" >> "$search_dir/index.md"
echo "# Blog" >> "$search_dir/index.md"

articleNum=0
for articleFile in $(cat articles.txt | tac) 
do
    echo "Adding blog article $articleFile"
    if [[ "$articleNum" -lt 5 ]]   # first 5 articles will be placed directly on blog page ---------------------------
    then
        lineNum=0
        while IFS= read -r line
        do
            if [[ "$lineNum" -eq 5 ]]
            then
                headline="${line:2}"                
                headline="## [${headline}](./${articleFile:15})" 
                echo "" >> "$search_dir/index.md"
                echo "$headline" >> "$search_dir/index.md"
            else
                if [[ "$lineNum" -gt 5 ]]
                then
                    if [[ "${line::1}" = "#" ]]
                    then
                        echo "#$line" >> "$search_dir/index.md"
                    else
                        echo "$line" >> "$search_dir/index.md"
                    fi
                fi
            fi
            lineNum=$((lineNum+1))
        done < "$articleFile"
    else                            # Older articles will be linked on blog archive page
        if [[ "$articleNum" -eq 5 ]]
        then
            echo "$line" >> "$search_dir/index.md"
            echo "Ältere Artikel sind im [Blog-Archiv](./blog-archive.md)" >> "$search_dir/index.md"
            
            echo "---" > "$search_dir/blog-archive.md"
            echo "description: Archivierte Ankündigungen, Aktuelles, und Spannendes aus von den Projekt-Mitgliedern" >> "$search_dir/blog-archive.md"
            echo "title: Archiv des Projekt-Blogs" >> "$search_dir/blog-archive.md"
            echo "---" >> "$search_dir/blog-archive.md"
            echo "# Blog-Archiv" >> "$search_dir/blog-archive.md"
            echo "" >> "$search_dir/blog-archive.md"
        fi

        lineNum=0
        while IFS= read -r line
        do
            if [[ "$lineNum" -eq 5 ]]
            then
                headline="${line:2}"                
                headline="## [${headline}](./${articleFile:15})"
                echo "$headline" >> "$search_dir/blog-archive.md"
                echo "" >> "$search_dir/blog-archive.md"
            elif [[ "$lineNum" -eq 9 ]]
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
