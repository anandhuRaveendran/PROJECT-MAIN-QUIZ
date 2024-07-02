
const Joinquiz = () => {
  return (
<>
<div className="p-4 sm:ml-64">
        <div className="p-4 border-2 bg-gray-100 rounded-lg dark:border-gray-700 mt-[80px]">

            <input className="justify-center w-[200px] border-2 border-gray-600 ml-[600px] rounded-lg h-10"
                placeholder="Enter joinID"/><a href="/quizdisplay">
            <button type="submit"
                className="inline-flex items-center mt-2 px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                Join Quiz
            </button></a>
        </div>
        </div>
</>  )
}

export default Joinquiz