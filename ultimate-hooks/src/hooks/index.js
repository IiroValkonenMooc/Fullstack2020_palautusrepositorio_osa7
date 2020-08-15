import React, { useState, useEffect } from 'react'
import axios from 'axios';

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(
        () => {
            console.log('effect')
            axios.get(baseUrl)
                .then( response => setResources(response.data))
        }, [baseUrl]
    )

    const create = async (resource) => {
        try {
            //console.log('resource :>> ', resource);
            const response = await axios.post(baseUrl, resource)
            setResources([...resources, response.data])
        } catch (error) {
            console.log('error :>> ', error);
        }
    }

    const service = {
        create
    }

    return [
        resources, service
    ]
}