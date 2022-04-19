
export const totalNumbers = async (src) => {
    console.log(src)
    let data = await fetch(process.env.REACT_APP_API+'/'+src)
    let answers = await data.json()
    //console.log(answers)
    return answers
}

export const lastNumbers = async () => {
    let data = await fetch(process.env.REACT_APP_DATA+'/positions?_expand=number')
    let answer = await data.json()

    let lst_numbers = []

    answer.forEach(position => {        
        lst_numbers.push(position['number']['id'])
    });

    return lst_numbers
}


 