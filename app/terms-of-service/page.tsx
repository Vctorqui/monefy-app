import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Términos de Servicio | Monefy",
  description: "Términos de servicio de Monefy - Condiciones de uso de nuestra aplicación de finanzas personales.",
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-8">Términos de Servicio</h1>
          
          <p className="text-muted-foreground mb-6">
            <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Aceptación de los Términos</h2>
              <p>
                Al acceder y utilizar Monefy ("la Aplicación"), aceptas estar sujeto a estos 
                Términos de Servicio ("Términos"). Si no estás de acuerdo con alguno de estos 
                términos, no debes utilizar la Aplicación.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Descripción del Servicio</h2>
              <p className="mb-4">
                Monefy es una aplicación de finanzas personales que te permite:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Gestionar tus cuentas bancarias y tarjetas de crédito</li>
                <li>Registrar y categorizar transacciones financieras</li>
                <li>Crear presupuestos y realizar seguimiento de gastos</li>
                <li>Visualizar reportes financieros y análisis</li>
                <li>Acceder a herramientas de planificación financiera</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Elegibilidad</h2>
              <p className="mb-4">
                Para utilizar Monefy debes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tener al menos 18 años de edad</li>
                <li>Ser capaz de celebrar contratos legalmente vinculantes</li>
                <li>Proporcionar información veraz y actualizada</li>
                <li>Cumplir con todas las leyes y regulaciones aplicables</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Cuenta de Usuario</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Registro</h3>
                <p>
                  Debes crear una cuenta para utilizar la Aplicación. Eres responsable de 
                  mantener la confidencialidad de tus credenciales de acceso.
                </p>
                
                <h3 className="text-xl font-medium">Información Precisa</h3>
                <p>
                  Debes proporcionar información precisa, actual y completa durante el 
                  registro y mantenerla actualizada.
                </p>
                
                <h3 className="text-xl font-medium">Seguridad de la Cuenta</h3>
                <p>
                  Eres responsable de todas las actividades que ocurran bajo tu cuenta. 
                  Notifica inmediatamente cualquier uso no autorizado.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Uso Aceptable</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Uso Permitido</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Gestionar tus finanzas personales de manera legítima</li>
                  <li>Utilizar la Aplicación según su propósito diseñado</li>
                  <li>Cumplir con todas las leyes y regulaciones aplicables</li>
                </ul>
                
                <h3 className="text-xl font-medium">Uso Prohibido</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Actividades ilegales o fraudulentas</li>
                  <li>Intentar acceder a cuentas de otros usuarios</li>
                  <li>Interferir con el funcionamiento de la Aplicación</li>
                  <li>Usar la Aplicación para actividades comerciales no autorizadas</li>
                  <li>Distribuir malware o contenido malicioso</li>
                  <li>Violar derechos de propiedad intelectual</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Datos Financieros</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Precisión de Datos</h3>
                <p>
                  Eres responsable de la precisión de toda la información financiera que 
                  ingreses en la Aplicación. No somos responsables de decisiones financieras 
                  basadas en datos inexactos.
                </p>
                
                <h3 className="text-xl font-medium">No Somos un Servicio Financiero</h3>
                <p>
                  Monefy es una herramienta de gestión financiera personal. No proporcionamos 
                  servicios bancarios, de inversión o asesoramiento financiero profesional.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Propiedad Intelectual</h2>
              <p className="mb-4">
                La Aplicación y su contenido están protegidos por derechos de autor, marcas 
                comerciales y otras leyes de propiedad intelectual. Te otorgamos una licencia 
                limitada, no exclusiva y revocable para usar la Aplicación.
              </p>
              <p>
                No puedes copiar, modificar, distribuir, vender o crear trabajos derivados 
                basados en la Aplicación sin nuestro permiso expreso por escrito.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Privacidad</h2>
              <p>
                Tu privacidad es importante para nosotros. El uso de la Aplicación también 
                está sujeto a nuestra{" "}
                <a href="/privacy-policy" className="text-primary hover:underline">
                  Política de Privacidad
                </a>
                , que forma parte de estos Términos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Disponibilidad del Servicio</h2>
              <p>
                Nos esforzamos por mantener la Aplicación disponible, pero no garantizamos 
                disponibilidad continua. Podemos suspender o interrumpir el servicio por 
                mantenimiento, actualizaciones o circunstancias imprevistas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Limitación de Responsabilidad</h2>
              <p className="mb-4">
                <strong>IMPORTANTE:</strong> La Aplicación se proporciona "tal como está" sin 
                garantías de ningún tipo. En la máxima medida permitida por la ley:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>No garantizamos que la Aplicación sea libre de errores o interrupciones</li>
                <li>No somos responsables de pérdidas financieras derivadas del uso de la Aplicación</li>
                <li>Nuestra responsabilidad total no excederá el monto pagado por el servicio</li>
                <li>No somos responsables de decisiones financieras tomadas basándose en la Aplicación</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Indemnización</h2>
              <p>
                Aceptas indemnizar y mantener indemne a Monefy de cualquier reclamo, pérdida, 
                daño o gasto (incluyendo honorarios legales) que surja de tu uso de la 
                Aplicación o violación de estos Términos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Terminación</h2>
              <p className="mb-4">
                Podemos suspender o terminar tu acceso a la Aplicación en cualquier momento 
                por violación de estos Términos o por cualquier otra razón a nuestra 
                discreción.
              </p>
              <p>
                Puedes terminar tu cuenta en cualquier momento eliminando tu cuenta a través 
                de la configuración de la Aplicación.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Modificaciones</h2>
              <p>
                Nos reservamos el derecho de modificar estos Términos en cualquier momento. 
                Los cambios significativos serán notificados a través de la Aplicación o por 
                correo electrónico. El uso continuado constituye aceptación de los nuevos términos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">14. Ley Aplicable</h2>
              <p>
                Estos Términos se rigen por las leyes de España y cualquier disputa será 
                resuelta en los tribunales competentes de España.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">15. Disposiciones Generales</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Divisibilidad</h3>
                <p>
                  Si alguna disposición de estos Términos es inválida, las demás disposiciones 
                  permanecerán en pleno vigor.
                </p>
                
                <h3 className="text-xl font-medium">Renuncia</h3>
                <p>
                  El hecho de que no ejerzamos algún derecho no constituye una renuncia a 
                  dicho derecho.
                </p>
                
                <h3 className="text-xl font-medium">Acuerdo Completo</h3>
                <p>
                  Estos Términos constituyen el acuerdo completo entre tú y Monefy respecto 
                  al uso de la Aplicación.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">16. Contacto</h2>
              <p className="mb-4">
                Si tienes preguntas sobre estos Términos de Servicio, puedes contactarnos:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p><strong>Email:</strong> victor.quinones.ch@gmail.com</p>
                <p><strong>Desarrollador:</strong> Victor</p>
                <p><strong>Proyecto:</strong> Monefy - Aplicación de Finanzas Personales</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
