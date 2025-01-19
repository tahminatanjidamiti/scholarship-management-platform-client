import useScholarship from "../../Hooks/useScholarship";


const AllScholarship = () => {
    const [scholarships] = useScholarship();
    
    return (
        <div className="container mx-auto p-4">
        <h1 className="text-center text-2xl font-bold mb-6">All Scholarships</h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {scholarships.map((scholarship, index) => {
                const {
                    universityName,
                    universityImage,
                    scholarshipCategory,
                    universityCity,
                    universityCountry,
                    applicationDeadline,
                    subjectCategory,
                    applicationFees,
                    ratings,
                } = scholarship;

                const averageRating =
                    ratings?.reduce((sum, rating) => sum + rating, 0) / ratings?.length;

                return (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full"
                    >
                        {/* University Image */}
                        <img
                            src={universityImage}
                            alt={`${universityName} logo`}
                            className="w-full h-32 object-cover"
                        />
                        {/* Card Content */}
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-semibold mb-2">{universityName}</h2>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Category:</strong> {scholarshipCategory}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Location:</strong> {universityCity}, {universityCountry}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Deadline:</strong> {applicationDeadline}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Subject Category:</strong> {subjectCategory}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <strong>Application Fees:</strong> ${applicationFees}
                            </p>
                            <p className="text-sm text-gray-600 mb-3">
                                <strong>Rating:</strong> {averageRating?.toFixed(1) || "N/A"} / 5
                            </p>
                            {/* Button */}
                            <div className="mt-auto">
                                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                                    Scholarship Details
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
);
};

export default AllScholarship;