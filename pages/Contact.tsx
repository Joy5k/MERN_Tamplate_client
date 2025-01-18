import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import swal from 'sweetalert';
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

interface EmailFormElements extends HTMLFormControlsCollection {
    from_name: HTMLInputElement;
    from_email: HTMLInputElement;
    from_subject: HTMLInputElement;
    message: HTMLTextAreaElement;
}

interface EmailForm extends HTMLFormElement {
    elements: EmailFormElements;
}

const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if any field is empty
    if (!form.current) {
        toast.error("Form reference is not available.");
        return;
    }

    const fields = Array.from(form.current.elements).filter(
        (element) => element.tagName === "INPUT" || element.tagName === "TEXTAREA"
    ) as (HTMLInputElement | HTMLTextAreaElement)[];
    const isEmptyField = fields.some((field) => !field.value);

    if (isEmptyField) {
        toast.error("Please fill in all fields.");
        return;
    }

    setIsLoading(true); // Set loading state

    emailjs
        .sendForm(
    import.meta.env.VITE_EMAILJS_SERVICE,
    import.meta.env.VITE_EMAILJS_TEMPLATE,
    form.current as EmailForm,
    import.meta.env.VITE_EMAILJS_USER
            )
        .then(
            (result) => {
                if (result.text === "OK") {
                    swal("Send!", "Thanks! I've got your email and I will contact you as soon as possible.", "success");
                    form.current?.reset();
                }
            },
            (error) => {
                console.log(error.text);
                toast.error("Error sending message.");
            }
        )
        .finally(() => {
            setIsLoading(false); // Reset loading state
        });
};

  return (
    <div className="flex flex-col md:flex-row lg:flex-row px-2">

       <div className=" shadow-md rounded-lg p-8 flex-1">
               <h1 className="text-3xl font-bold  mb-4">About The Developer</h1>
               <p className="text-gray-400 leading-relaxed mb-4">
                 Hello! I’m <Link to="https://developer-mehedi.vercel.app" target="_blank" className="hover:underline text-primary font-semibold">Mehedi Hasan Joy</Link>, a passionate Full Stack Web Developer. 
                 I specialize in building dynamic, responsive, and user-friendly web applications. 
               </p>
               <p className="text-gray-400 leading-relaxed mb-4">
                 My skillset includes:
               </p>
               <ul className="list-disc list-inside text-gray-400 mb-4">
                 <li>JavaScript, TypeScript</li>
                 <li>React.js, Redux, Next.js</li>
                 <li>Prisma, MongoDB, Mongoose, PostgreSQL</li>
                 <li>Node.js, Express.js</li>
                 <li>Ant Design, Material UI, Tailwind CSS</li>
               </ul>
               <p className="text-gray-400 leading-relaxed">
                 I am also a final-year student pursuing a bachelor's degree in BSS at Govt. Barisal College, Bangladesh. 
                 My journey is fueled by curiosity and a drive to solve real-world problems through technology.
               </p>
             </div>


     <div className="flex-1">
     <form ref={form} onSubmit={sendEmail} className="mt-4 p-10 border  bg-gray-800  shadow-2xl">
        <div className="mb-4">
          <input
            name="from_name"
            type="text"
            className="w-full px-4 py-2 rounded-md bg-primaryDark  border-primaryDark focus:border-primaryLight text-gray-300 focus:outline-none focus:bg-primary"
            placeholder="Your Name"
          />
        </div>
        <div className="mb-4">
          <input
            name="from_email"
            type="email"
            className="w-full px-4 py-2 rounded-md bg-primaryDark  border-primaryDark focus:border-primaryLight text-gray-300 focus:outline-none focus:bg-primary"
            placeholder="Your Email"
          />
        </div>
        <div className="mb-4">
          <input
            name="from_subject"
            type="text"
            className="w-full px-4 py-2 rounded-md bg-primaryDark  border-primaryDark focus:border-primaryLight text-gray-300 focus:outline-none focus:bg-primary"
            placeholder="Subject"
          />
        </div>
        <div className="mb-4">
          <textarea
            name="message"
            className="w-full px-4 py-2 rounded-md bg-primaryDark border-primaryDark focus:border-primaryLight text-gray-300 focus:outline-none focus:bg-primary"
            rows={4}
            placeholder="Your Message"
          ></textarea>
        </div>
        <button
          type="submit"
          className={`bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-primaryLight focus:outline-none ${
            isLoading && "cursor-wait"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Message"}
        </button>
      </form>
     </div>
    </div>
  );
};

export default Contact;