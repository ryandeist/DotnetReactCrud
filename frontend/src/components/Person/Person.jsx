// React
import { useForm } from 'react-hook-form';
import { useState, useEffect, use } from 'react';
import toast from 'react-hot-toast';

// Components
import PersonForm from "./PersonForm"
import PersonList from "./PersonList"

// API
import axios from 'axios';


function Person() {
    const BASE_URL = import.meta.env.VITE_BASE_API_URL;
    
    const [people, setPeople] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editPersonData, setEditPersonData] = useState(null);

    useEffect(() => {
        
        const fetchPeople = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/people`);
                setPeople(response.data);
            } catch (error) {
                console.error('Error fetching people:', error);
                toast.error('Error fetching people');
            } finally {
                setIsLoading(false);
            }
        }

        fetchPeople();
    }, []);

    useEffect(() => {
        methods.reset(editPersonData);
    }, [editPersonData])

    const defaultFormData = {
        personId: 0,
        firstName: '',
        lastName: '',
    };

    const methods = useForm({
        defaultValues: defaultFormData,
    });

    const handleSubmitPersonForm = (formData) => {
        setIsLoading(true);
        try {
            if (formData.personId === 0) {
                setPeople([...people, formData]);
            } else {
                setPeople(people.map(person => person.personId === formData.personId ? formData : person));
            }
            handleFormReset(defaultFormData);
            toast.success('Person form submitted successfully');
        } catch (error) {
            console.error('Error submitting person form:', error);
            toast.error('Error submitting person form');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditPerson = (person) => {
        setEditPersonData(person);
    };

    const handleDeletePerson = (person) => {
        if(!confirm(`Are you sure you want to delete ${person.firstName} ${person.lastName}?`)) return;
        setIsLoading(true);

        try {
            setPeople(people.filter(p => p.personId !== person.personId));
            toast.success('Person deleted successfully');
        } catch (error) {
            console.error('Error deleting person:', error);
            toast.error('Error deleting person');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormReset = () => {
        methods.reset(defaultFormData);
    }

    return (
        isLoading ? (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        ) : (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Person Management
                    </h1>

                </div>

                <PersonForm
                    methods={methods}
                    formReset={handleFormReset}
                    formSubmit={handleSubmitPersonForm}
                />
                <PersonList
                    people={people}
                    handleEditPerson={handleEditPerson}
                    handleDeletePerson={handleDeletePerson} />
                </div>
            </div>
        )
    )
}

export default Person