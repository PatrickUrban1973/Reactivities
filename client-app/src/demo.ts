export interface Duck{
    name: string;
    numLegs: number;
    makeSound: (sound: string) => void;
}

const duck1: Duck = {
    name: 'huey',
    numLegs: 2,
    makeSound: (sound: any) => console.log(sound)
}

const duck2: Duck = {
    name: 'duey',
    numLegs: 2,
    makeSound: (sound : string) => console.log(sound)
}

duck1.makeSound('ddsfsdf');
duck2.makeSound('sdfsadfasd');


export const ducks  = [duck1, duck2]

let data: number | string = 42

data = '42'

console.log(data);