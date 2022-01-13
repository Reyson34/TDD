
export class Formatter {

    // ['Date', '2021-12-02'],
    // ['Amount', '+500'],
    // ['Balance', '500'],

    // 'Date       Amount  Balance\n' +
    // '2021-12-02   +500      500\n'
    /*
        Premiere colonne des dates: aligné à gauche
        les autres colonne aligné à droite moins 1 caractere

        Date    __Amount__Balance\n
        XXXXXXXX__ YYYY___   ZZZ_\n

    */
    /*
        pour chaque tableau de données
            chercher la plus longue valeur
            pour toutes les colonnes sauf la premiere lui ajouter 2

            

        pour chaque tableau de données
            prendre le premier et generer la ligne de titre
                ()
            Pour chaque autre données
                premiere donnée: aligner à gauche
                sinon aligner à droite -1 caractere




    */

    columnLength = (arr) => {
        // contient la longeur max de chaque colonne
        const maxLenght = []
        arr.forEach((col, indexCol) => {
            col.forEach((row, indexRow) => {
                if(row.length > (maxLenght[indexCol] || 0))
                    maxLenght[indexCol] = row.length
            });
            if(indexCol > 0) maxLenght[indexCol] += 2
        });
        return maxLenght
    }

    format = (arr) => {
        //les longueurs de chaque colonne
        const colLength = this.columnLength(arr)

        const result = []
        //on va parcourir uniquement la premiere valeur de chaque ligne de arr
        //ces valeurs sont les headers
        arr.forEach((col, indexCol) => {
            col.forEach((row, indexRow) => {
                if(row == 0){ // cas des headers
                    if(indexCol == 0) result[0]= row.padEnd(colLength[0]) 
                    else result[indexCol] = row.padEnd(row.length).padStart(colLength[indexCol])//    (colLength - col.lenght-1) row.length 1
                }else{

                }
            });

        });

        return result.join('')
    }




    /*format = (arr) => {
        const res = []

        arr.forEach((row, index) => {
            var size = 0
            row.forEach(string => {
                size = Math.max(size, string.length)
            })

            res[index] = []           
            row.forEach((string, key) => {
                res[index][key] = string.padEnd(size + 2)
            })
        })

        var result = ''
        for (var i = 0; i < res[0].length; i++) {
            res.forEach(row => {
                result += row[i]
            })
            result += '\n'
        }

        return result 
    }*/
}

