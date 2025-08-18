// React
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Components
import PersonForm from "./PersonForm"
import PersonList from "./PersonList"


function Person() {
    const [dummyPeople, setDummyPeople] = useState([
        {
            personId: 1,
            firstName: 'John',
            lastName: 'Doe',
        },
        {
            personId: 2,
            firstName: 'Jane',
            lastName: 'Smith',
        },
        {
            personId: 3,
            firstName: 'Jim',
            lastName: 'Beam',
        },
    ]);

    const [editPersonData, setEditPersonData] = useState(null);

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
        try {
            if (formData.personId === 0) {
                setDummyPeople([...dummyPeople, formData]);
            } else {
                setDummyPeople(dummyPeople.map(person => person.personId === formData.personId ? formData : person));
            }
            handleFormReset(defaultFormData);
            toast.success('Person form submitted successfully');
        } catch (error) {
            console.error('Error submitting person form:', error);
            toast.error('Error submitting person form');
        }
    };

    const handleEditPerson = (person) => {
        setEditPersonData(person);
    };

    const handleDeletePerson = (person) => {
        try {
            setDummyPeople(dummyPeople.filter(p => p.personId !== person.personId));
            toast.success('Person deleted successfully');
        } catch (error) {
            console.error('Error deleting person:', error);
            toast.error('Error deleting person');
        }
    };

    const handleFormReset = () => {
        methods.reset(defaultFormData);
    }

    return (
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
                    people={dummyPeople}
                    handleEditPerson={handleEditPerson}
                    handleDeletePerson={handleDeletePerson} />
            </div>
        </div>
    )
}

export default Person