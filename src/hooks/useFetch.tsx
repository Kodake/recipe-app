import { useState, useEffect } from 'react';
import { Recipe } from '../interfaces/appInterfaces';

export const useFetch = (url: string, method = 'GET') => {
    const [recipes, setRecipes] = useState<Recipe[] | undefined>([]);
    const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
    const [isPending, setIsPending] = useState(false);
    const [recipeId, setRecipeId] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [options, setOptions] = useState<RequestInit | null>(null);

    const postData = (postData: any) => {
        setOptions({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
    }

    const putData = (putData: any) => {
        setOptions({
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(putData)
        }); 
    }

    const deleteData = (id: string) => {
        setRecipeId(id);
        setOptions({
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
    }

    useEffect(() => {
        const controller = new AbortController()

        const fetchData = async (fetchOptions: RequestInit | undefined) => {
            setIsPending(true);

            try {
                const res = await fetch(url, { ...fetchOptions, signal: controller.signal });

                if (!res.ok) {
                    throw new Error(res.statusText);
                }

                const data = await res.json();

                setIsPending(false);
                setRecipe(data);
                setRecipes(data);
                setError(null);
            } catch (err: any) {
                if (err.name === 'AbortError') {
                    console.log('the fetch was aborted');
                } else {
                    setIsPending(false);
                    setError('Could not fetch the data');
                }
            }
        }

        if (method === 'GET') {
            fetchData({});
        }

        if (method === 'POST' && options || method === 'DELETE' && options) {
            fetchData(options);
        }

        if (method === 'PUT' && options) {
            fetchData(options);
        }

        return () => {
            controller.abort();
        }

    }, [url, options, method]);

    return { recipes, recipe, isPending, error, postData, putData, deleteData }
}