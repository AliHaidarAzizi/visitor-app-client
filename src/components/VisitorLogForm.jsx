
import { useNavigate, useParams } from 'react-router-dom'
import Header from './header'
import { addVisitor } from '../../utils/api/addVisitor'
import { toast } from 'react-toastify'

const VisitorLogForm = () => {
 let {venueId } = useParams()
 console.log(venueId)
  venueId = parseInt(venueId)
 const navigate = useNavigate()

 const handleSubmit = async(e) => {
  e.preventDefault()

    const visitorName = e.target[0].value
    const visitorEmail = e.target[1].value
    const visitorContactNo = e.target[2].value
    const visitorReason = e.target[3].value
    
    const data = {visitorName, visitorEmail, visitorContactNo, visitorReason, venueId}
    
    try {
      console.log(data)
      const res = await addVisitor(data)
      console.log(res)
       toast.success(res.data.message, {
        icon: "🚀",
        autoClose: 3000
      })

      setTimeout(() => {
        navigate("/login");
      }, 3000)


    } catch (error) {
      console.error(error);
      if (error.response.data.message) { 
       return toast.error(error.response.data.message)
      }
      toast.error(error.response.data.errors[0].message)
      
      // alert(error.response.data.message);response.data.message
    }


 }
  
  return (
    <>
    <Header />
    <div>
    <main className='m-4 mr-8 w-full lg:w-2/3'>
            <div className=' p-4 flex flex-col justify-center items-center gap-2'>
                <h4 className=' text-2xl font-bold'>Visitor Form</h4>
                <p>Please fill in the form</p>
                <form 
                onSubmit={(e) => handleSubmit(e)}
                className='w-5/6 lg:w-2/3 md:w-5/6 mt-2'>
                    <div className="mb-6">
                        <label htmlFor="visitorName" className="block mb-2 text-md font-medium text-gray-900 ">Full Name</label>
                        <input type='text' id="visitorName" 
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John Doe" required />

                    </div>
                    <div className="mb-6">
                        <label htmlFor="visitorEmail" className="block mb-2 text-md font-medium text-gray-900 ">Email</label>
                        <input type='email' id="visitorEmail" 
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Johndoe@email.com" required />

                    </div>
                    <div className="mb-6">
                        <label htmlFor="visitorContactNo" className="block mb-2 text-md font-medium text-gray-900 ">Contact No</label>
                        <input type='tel' id="visitorContactNo" 
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="0123456789" required />

                    </div>
                    <div className="mb-6">
                        <label htmlFor="visitorReason" className="block mb-2 text-md font-medium text-gray-900 ">Reason of Visiting</label>
                        <textarea name="visitorReason" id="visitorReason" cols="15" rows="5" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Pick up guest" required ></textarea>
                        

                    </div>
                    
                    
                    <button type="submit" className="text-white bg-indigo-700 w-full hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center">Submit</button>
                </form>
            </div>
        </main>
    </div>
    </>
  )
}

export default VisitorLogForm