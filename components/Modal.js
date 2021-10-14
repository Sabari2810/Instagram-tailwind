import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/outline";
import React, { Fragment, useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { db, storage } from "../firebase";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";

function Modal() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const uploadPost = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `/posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadUrl = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadUrl,
        });
      }
    );

    // const snapshot = await uploadString(imageRef, selectedFile, "data_url");
    // const downloadUrl = await getDownloadURL(imageRef);
    // await updateDoc(doc(db, "posts", docRef.id), {
    //   image: downloadUrl,
    // });

    setIsLoading(false);
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => setIsModalOpen(false)}
      >
        <div className="flex items-end justify-center min-h-[800px] pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-opacity-75 bg-gray-500 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="align-bottom inline-block bg-white rounded-lg
            px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform 
            transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6
            "
            >
              {selectedFile ? (
                <img
                  onDoubleClick={() => setSelectedFile(null)}
                  src={selectedFile}
                  className="object-contain w-full"
                  alt=""
                />
              ) : (
                <div className="mx-auto h-12 w-12 flex items-center cursor-pointer rounded-full bg-red-100 justify-center">
                  <CameraIcon
                    onClick={() => filePickerRef.current.click()}
                    className="h-6 w-6 text-red-500"
                  />
                </div>
              )}
              <div className="text-center sm:mt-5 mt-3">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 font-medium text-gray-900"
                >
                  Upload a Photo
                </Dialog.Title>
                <div>
                  <input
                    type="file"
                    onChange={addImageToPost}
                    ref={filePickerRef}
                    hidden
                  />
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    ref={captionRef}
                    placeholder="Please enter a caption.."
                    className="border-none text-center focus:ring-0 w-full"
                  />
                </div>
              </div>
              <div className="mt-4">
                <button
                  disabled={!selectedFile}
                  onClick={uploadPost}
                  className="bg-red-600 px-4 py-2 rounded-md shadow-sm text-white border border-transparent w-full
              justify-center font-medium  focus:ring-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 
              focus:ring-offset-2 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed
              "
                >
                  {isLoading ? "Uploading..." : "Upload Post"}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
