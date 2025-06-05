import React from "react";
import { Formik, Form, FieldArray } from "formik";
import toast from "react-hot-toast";

const AdvancedForm = () => {
  return (
    <Formik
      initialValues={{ ingredientes: [{ nombre: "", cantidad: "" }] }}
      onSubmit={(values, actions) => {
        toast.success("Formulario dinámico enviado");
        actions.setSubmitting(false);
        console.log("Final values", values);
      }}
    >
      {({ values, handleChange, isSubmitting }) => (
        <Form className="max-w-lg space-y-4">
          <FieldArray name="ingredientes">
            {({ push, remove }) => (
              <>
                {values.ingredientes.map((ingrediente, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      name={`ingredientes[${index}].nombre`}
                      placeholder="Nombre"
                      value={ingrediente.nombre}
                      onChange={handleChange}
                      className="flex-1 border rounded px-2 py-1"
                    />
                    <input
                      name={`ingredientes[${index}].cantidad`}
                      placeholder="Cantidad"
                      value={ingrediente.cantidad}
                      onChange={handleChange}
                      className="flex-1 border rounded px-2 py-1"
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500"
                    >
                      ✖
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => push({ nombre: "", cantidad: "" })}
                  className="bg-blue-400 text-white px-3 py-1 rounded mt-2"
                >
                  Añadir Ingrediente
                </button>
              </>
            )}
          </FieldArray>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {isSubmitting ? "Guardando..." : "Guardar"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AdvancedForm;