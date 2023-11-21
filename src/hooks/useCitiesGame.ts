import { useEffect, useRef, useState } from "react";
import { forbiddenLetters } from "../data/forbiddenLetters";
import cities from '/src/data/cities.json';
import getRandomInt from "../utils/getRandom";

export default function useCitiesGame() {
   const citiesMap = useRef<Map<string, string[]>>();

   useEffect(() => {
      citiesMap.current = cities.reduce((citiesMap: Map<string, string[]>, city: string) => {
         const firstLetter = city[0];
         let citiesStartingWithLetter = citiesMap.get(firstLetter) || [];
         citiesStartingWithLetter?.push(city);
         citiesMap.set(firstLetter, citiesStartingWithLetter);
         return citiesMap;
      }, new Map<string, string[]>());
   }, []);


   const [listedCities, setListedCities] = useState<string[]>([]);
   const lastCity = listedCities[listedCities.length - 1];


   const getLastLetter = (word: string = lastCity) => {
      const lastLetter = word[word.length - 1];
      if (forbiddenLetters.includes(lastLetter))
         return word[word.length - 2];
      return lastLetter;
   }


   function getCitiesStartingWithLetter(letter: string): string[] | undefined {
      return citiesMap.current?.get(letter);
   }


   function giveAnswer(lastCity: string): void {
      const citiesStartingWithLetter = getCitiesStartingWithLetter(getLastLetter(lastCity).toUpperCase());

      if (!citiesStartingWithLetter || citiesStartingWithLetter.length === 0) {
         return;
      }

      const randomIndex = getRandomInt(0, citiesStartingWithLetter.length);
      const [answer] = citiesStartingWithLetter.splice(randomIndex, 1);
      answer && setListedCities(prev => ([...prev, answer]));
   }


   function getAnswer(answer: string): void {
      if (!answer) {
         throw new Error(`Пожалуйста, назовите город`);
      }

      const firstLetter = answer[0];
      if (firstLetter !== firstLetter.toUpperCase()) {
         throw new Error(`Название города пишется с большой буквы`);
      }

      const citiesStartingWithLetter = getCitiesStartingWithLetter(firstLetter);
      if (!citiesStartingWithLetter) {
         throw new Error(`Я не знаю Российских городов на букву ${firstLetter}`);
      }

      const indexOfAnswer = citiesStartingWithLetter.indexOf(answer);
      if (indexOfAnswer === -1) {
         throw new Error(`Я не знаю такого Российского города или он уже был назван`);
      }

      if (listedCities.length > 0 && firstLetter !== getLastLetter().toUpperCase()) {
         throw new Error(`Город должен начинаться на последнюю букву ответа 
         предыдущего игрока (кроме ${forbiddenLetters})`);
      }

      citiesStartingWithLetter.splice(indexOfAnswer, 1);
      setListedCities(prev => ([...prev, answer]));
   }


   return { listedCities, getAnswer, giveAnswer };
}