import { Save, RotateCcw } from 'lucide-react';


const PersonForm = ({ methods, formReset, formSubmit }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6" style={{ marginBottom: '5px' }}>
            <form className="space-y-4" onSubmit={handleSubmit(formSubmit)}>
                <input type="hidden" {...register('personId')} />
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                            First Name*
                        </label>
                        <input
                            type="text"
                            {...register('firstName', { 
                                required: true, 
                                maxLength: 30 
                            })}
                            className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2" 
                            placeholder="Enter first name"
                        />
                        {errors.firstName?.type === 'required' && 
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                First Name required
                            </p>
                        }
                        {errors.firstName?.type === 'maxLength' && 
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                First Name must be less than 30 characters
                            </p>
                        }
                    </div>

                    <div className="flex-1">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name*
                        </label>
                        <input
                            type="text"
                            {...register('lastName', {
                                required: true, 
                                maxLength: 30 
                            })}
                            className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2" 
                            placeholder="Enter last name"
                        />
                        {errors.lastName?.type === 'required' && 
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                Last Name required
                            </p>
                        }
                        {errors.lastName?.type === 'maxLength' && 
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                Last Name must be less than 30 characters
                            </p>
                        }
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                        type="submit"
                        className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        <Save className="w-4 h-4 mr-2" />
                    </button>

                    <button
                        onClick={formReset}
                        type="button"
                        className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PersonForm