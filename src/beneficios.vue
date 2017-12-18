<template>
    <div id="beneficios">
        <h1>Beneficios del Yoga </h1>
        
        <ul class="list" id="list-1" v-if="ver">
            <li>Crecen tus niveles de energía</li>
            <li>Mejora tu flexibilidad</li>
            <li>Incrementa tu capacidad pulmonar</li>
            <li>Te relaja. Reduce el estrés y la ansiedad</li>
            <li>Protege, fortalece y flexibiliza tu columna vertebral</li>
            <li>Construye músculos fuertes</li>
            <li>Te ayuda a conseguir tu peso ideal</li>
            <li>Reduce el colesterol</li>
            <li>Alivia dolencias de cervical y cuello</li>
            <li>Aumenta tu resistencia</li>
    </ul>
    <ul class="list" id="list-2" v-if="!ver">
        <li>Desarrolla tu concentración</li>
        <li>Disminuye el azúcar en la sangre</li>
        <li>Previene problemas digestivos</li>
        <li>Te ayuda a dormir mejor</li>
        <li>Aumenta el flujo de sangre</li>
        <li>Desarrolla tu equilibrio</li>
        <li>Mejora la salud de tus huesos</li>
        <li>Te ayuda a conocerte mejor y tomar decisiones con más claridad</li>
        <li>Te conecta con tu verdadera esencia, sin condicionamientos</li>
        <li>Mejora tus relaciones personales</li>
    </ul>
     <button  v-on:click="ver = false" v-if="ver">Ver mas</button>
     <button  v-on:click="ver = true" v-if="!ver">Ver anteriores</button>
    </div>
</template>

<script>
export default {
    name: 'app',
    data: function(){
        return{
           ver: true
        }
    }
}
</script>



