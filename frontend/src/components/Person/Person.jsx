import PersonForm from "./PersonForm"
import PersonList from "./PersonList"
import { useForm } from 'react-hook-form';

function Person() {
    const defaultFormData = {
        personId: 0,
        firstName: '',
        lastName: '',
    }

    const methods = useForm({
        defaultValues: defaultFormData,
    });

    const dummyPeople = [
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
    ]

    const handleEditPerson = (personId) => {
        console.log(`Editing person with ID: ${personId}`);
    }

    const handleDeletePerson = (personId) => {

        console.log(`Deleting person with ID: ${personId}`);
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Person Management
                    </h1>

                </div>

                <PersonForm methods={methods} />
                <PersonList 
                    people={dummyPeople} 
                    handleEditPerson={handleEditPerson} 
                    handleDeletePerson={handleDeletePerson} />
            </div>
        </div>
    )
}

export default Person