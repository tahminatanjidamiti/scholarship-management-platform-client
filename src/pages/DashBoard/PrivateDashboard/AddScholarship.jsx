import { useForm } from "react-hook-form";
import { FaUniversity } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddScholarship = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        const imageFile = { image: data.universityImage[0] };

        // Upload image to imgbb
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data",
            },
        });

        if (res.data.success) {
            // Construct scholarship data
            const scholarshipData = {
                scholarshipName: data.scholarshipName,
                universityName: data.universityName,
                universityImage: res.data.data.display_url,
                universityCountry: data.universityCountry,
                universityCity: data.universityCity,
                universityRank: parseInt(data.universityRank),
                subjectCategory: data.subjectCategory,
                scholarshipCategory: data.scholarshipCategory,
                degree: data.degree,
                tuitionFees: data.tuitionFees ? parseFloat(data.tuitionFees) : null,
                applicationFees: parseFloat(data.applicationFees),
                serviceCharge: parseFloat(data.serviceCharge),
                applicationDeadline: data.applicationDeadline,
                scholarshipPostDate: data.scholarshipPostDate,
                postedUserEmail: data.postedUserEmail,
            };

            // Send scholarship data to the server
            const scholarshipRes = await axiosSecure.post("/scholarships", scholarshipData);

            if (scholarshipRes.data.insertedId) {
                reset();
                // Show success popup
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.scholarshipName} has been added successfully.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
    };

    return (
        <div>
            <h2 className="text-xl md:text-3xl font-semibold mb-4 text-center">Add Scholarship</h2>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                        {/* Scholarship Name */}
                        <div className="form-control w-full md:my-6">
                            <label className="label">
                                <span className="label-text">Scholarship Name*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Scholarship Name"
                                {...register("scholarshipName", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* University Details */}
                        <div className="form-control w-full md:my-6">
                            <label className="label">
                                <span className="label-text">University Name*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="University Name"
                                {...register("universityName", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                        {/* University Country */}
                        <div className="form-control w-full md:my-6">
                            <label className="label">
                                <span className="label-text">University Country*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Country"
                                {...register("universityCountry", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* University City */}
                        <div className="form-control w-full md:my-6">
                            <label className="label">
                                <span className="label-text">University City*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="City"
                                {...register("universityCity", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>
                    {/* Dropdowns for Categories */}
                    <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                        {/* Subject Category */}
                        <div className="form-control w-full md:my-6">
                            <label className="label">
                                <span className="label-text">Subject Category*</span>
                            </label>
                            <select
                                defaultValue="default"
                                {...register("subjectCategory", { required: true })}
                                className="select select-bordered w-full"
                            >
                                <option disabled value="default">
                                    Select a Category
                                </option>
                                <option value="Agriculture">Agriculture</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Doctor">Doctor</option>
                            </select>
                        </div>

                        {/* Scholarship Category */}
                        <div className="form-control w-full md:my-6">
                            <label className="label">
                                <span className="label-text">Scholarship Category*</span>
                            </label>
                            <select
                                defaultValue="default"
                                {...register("scholarshipCategory", { required: true })}
                                className="select select-bordered w-full"
                            >
                                <option disabled value="default">
                                    Select a Category
                                </option>
                                <option value="Full fund">Full fund</option>
                                <option value="Partial">Partial</option>
                                <option value="Self-fund">Self-fund</option>
                            </select>
                        </div>
                    </div>
                    {/* Financial Details */}
                    <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                        {/* Tuition Fees */}
                        <div className="form-control w-full md:my-6">
                            <label className="label">
                                <span className="label-text">Tuition Fees (Optional)</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Tuition Fees"
                                {...register("tuitionFees")}
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Application Fees */}
                        <div className="form-control w-full md:my-6">
                            <label className="label">
                                <span className="label-text">Application Fees*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Application Fees"
                                {...register("applicationFees", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                        <div className="form-control w-full md:my-6">
                            <label className="label">
                                <span className="label-text">University World Rank*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Rank"
                                {...register("universityRank", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>
                        {/* Service Charge */}
                        <div className="form-control w-full md:my-6">
                            <label className="label">
                                <span className="label-text">Service Charge*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Service Charge"
                                {...register("serviceCharge", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>
                    {/* Dates */}
                    <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                        {/* Application Deadline */}
                        <div className="form-control w-full md:my-6">
                            <label className="label">
                                <span className="label-text">Application Deadline*</span>
                            </label>
                            <input
                                type="date"
                                {...register("applicationDeadline", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Scholarship Post Date */}
                        <div className="form-control w-full md:my-6">
                            <label className="label">
                                <span className="label-text">Scholarship Post Date*</span>
                            </label>
                            <input
                                type="date"
                                {...register("scholarshipPostDate", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                        {/* Posted User Email */}
                        <div className="form-control w-full md:my-6">
                            <label className="label">
                                <span className="label-text">Posted User Email*</span>
                            </label>
                            <input
                                type="email"
                                placeholder="User Email"
                                {...register("postedUserEmail", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>
                        {/* Degree */}
                        <div className="form-control w-full md:my-6">
                            <label className="label">
                                <span className="label-text">Degree*</span>
                            </label>
                            <select
                                defaultValue="default"
                                {...register("degree", { required: true })}
                                className="select select-bordered w-full"
                            >
                                <option disabled value="default">
                                    Select Degree
                                </option>
                                <option value="Diploma">Diploma</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="Masters">Masters</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-control w-full my-6">
                        <input
                            {...register("universityImage", { required: true })}
                            type="file"
                            className="file-input w-full max-w-xs"
                        />
                    </div>
                    {/* Submit Button */}
                    <button className="btn">
                        Add Scholarship <FaUniversity></FaUniversity>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddScholarship;