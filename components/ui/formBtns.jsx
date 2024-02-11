import React from 'react'

const FormBtns = ({status,modal}) => {
  return (
    <div className="w-full flex justify-between my-4">
      <button
        className="btn w-[40%]"
        type="button"
        onClick={() => document.getElementById(modal).close()}
      >
        Close
      </button>
      {status === "pending" ? (
        <button
          type="button"
          class="btn inline-flex items-center px-4 py-2  leading-6   transition ease-in-out duration-150 cursor-not-allowed"
        >
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        Submitting...
        </button>
      ) : (
        <button className="btn w-[40%]" type="submit">
          Submit
        </button>
      )}
    </div>
  );
}

export default FormBtns