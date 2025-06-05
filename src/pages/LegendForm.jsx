import React, { useState } from "react";
import { Formik, Form } from "formik";
import toast from "react-hot-toast";
import ConfirmationModal from "../components/ConfirmationModal";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import IngredientesModal from "../components/IngredientesModal";

const LegendForm = () => {
  //Modal Confirmacion
  const [title, setTitle] = useState("Confirmation");
  const [message, setMessage] = useState("Are you sure you do this?");
  const [type, setType] = useState(0);
  const [showModalConfirmation, setShowModalConfirmation] = useState(false);
  const toggleModalConfirmation = () => setShowModalConfirmation(!showModalConfirmation);

  //Modal Ingredientes
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const [formData, setFormData] = useState(null);
  const [formActions, setFormActions] = useState(null);
  const validateErrors = (values) => {
    const errors = {};
    if (!values.ingredientes || values.ingredientes.length === 0) {
      errors.ingredientes = "Debe agregar al menos un ingrediente";
    }
    return errors;
  };

  const handleConfirm = (confir) => {
    if (!confir) {
      toast.error("Formulario no enviado");
      formActions.setSubmitting(false);
      console.log("Form data not submitted:", formData);
    } else {
      toast.success("Formulario enviado correctamente");
      formActions.setSubmitting(false);
      formActions.resetForm();
    }
  };

  return (
    <>
      <ConfirmationModal
        isOpen={showModalConfirmation}
        toggle2={toggleModalConfirmation}
        message={message}
        title={title}
        type={type}
        toggleConfirmation={handleConfirm}
      />

      <Formik
        initialValues={{ ingredientes: [] }}
        validate={validateErrors}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          setFormData(values);
          setFormActions(actions);
          toggleModalConfirmation();
          setTitle("Confirmación de Envío");
          setMessage("¿Estás seguro de que deseas enviar este formulario?");
          setType(1);
        }}>
        {({ handleChange, values, errors, isSubmitting }) => (
          <Form className="w-full space-y-4 px-96">
            <IngredientesModal
              isOpen={showModal}
              toggle={toggleModal}
              valueOld={values.ingredientes}
              handleChangePadre={handleChange}
            />
            <div className="flex justify-between items-center mb-4">
              <h1 className="block text-xl font-bold text-gray-700">
                ¿Cómo hacer una lasaña?
              </h1>
            </div>

            <div className="flex space-x-4 items-center">
              <label className="text-sm font-medium text-gray-700">
                Lista de Ingredientes
              </label>

              <button
                type="button"
                onClick={() => {
                  //levantar modal para agregar un nuevo ingrediente
                  toggleModal();
                }}
                className="bg-green-400 text-white px-3 py-1 rounded">
                <PlusCircleIcon className="h-6 w-6 hover:font-semibold hover:scale-110 transform transition-all duration-500 ease-in-out" />
              </button>
            </div>

            {values.ingredientes && values.ingredientes.length > 0 && (
              <table className="w-full mt-2">
                <thead>
                  <tr>
                    <th className="text-left border px-2">Nombre</th>
                    <th className="text-left border px-2">Cantidad porción</th>
                    <th className="text-left border px-2">Tipo cocción</th>
                    <th className="text-left border px-2">Tiempo cocción</th>
                    <th className="text-left border px-2">Indicaciones</th>
                    <th className="text-center border px-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {values.ingredientes.map((ingrediente, index) => (
                    <tr key={index}>
                      <td className="text-left border px-2">
                        <span className="text-sm font-medium text-gray-700">
                          {ingrediente.nombre}
                        </span>
                      </td>
                      <td className="text-left border px-2">
                        <span className="text-sm font-medium text-gray-700">
                          {ingrediente.cantidadPorcion}
                        </span>
                      </td>
                      <td className="text-left border px-2">
                        <span className="text-sm font-medium text-gray-700">
                          {ingrediente.tipoCoccion}
                        </span>
                      </td>
                      <td className="text-left border px-2">
                        <span className="text-sm font-medium text-gray-700">
                          {ingrediente.tiempoCoccion}
                        </span>
                      </td>
                      <td className="text-left border px-2">
                        <span className="text-sm font-medium text-gray-700">
                          {ingrediente.indicaciones}
                        </span>
                      </td>
                      <td className="text-center border-b border-r p-2">
                        <button
                          type="button"
                          onClick={() => {
                            const nuevosIngredientes = [...values.ingredientes];
                            nuevosIngredientes.splice(index, 1);
                            handleChange({
                              target: {
                                name: "ingredientes",
                                value: nuevosIngredientes,
                              },
                            });
                          }}
                          className="text-red-500 hover:text-red-700 hover:scale-110 transform transition-all duration-500 ease-in-out">
                          <TrashIcon className="h-6 w-6" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {values.ingredientes && values.ingredientes.length === 0 && (
              <table className="w-full mt-2">
                <tbody>
                  <tr>
                    <td colSpan="6" className="text-center text-gray-500">
                      No hay ingredientes añadidos
                    </td>
                  </tr>
                </tbody>
              </table>
            )}

            {errors.ingredientes && (
              <p className="text-red-500 text-sm mt-2">{errors.ingredientes}</p>
            )}

            <div className="flex justify-center w-full">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 text-white px-4 py-2 rounded">
                {isSubmitting ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LegendForm;
