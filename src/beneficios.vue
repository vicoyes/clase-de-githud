<template>
    <div id="beneficios">
        <h1>Beneficios del Yoga </h1>
        
        <ul class="list fa-ul" id="list-1" v-if="ver">
            <li class="lista"><span class="li-check fa-li"><i class="fas fa-check"></i></span> tus niveles de energía</li>
            <li class="lista"><span class="li-check fa-li"><i class="fas fa-check"></i></span>Mejora tu flexibilidad</li>
            <li class="lista"><span class="li-check fa-li"><i class="fas fa-check"></i></span>Incrementa tu capacidad pulmonar</li>
            <li class="lista"><span class="li-check fa-li"><i class="fas fa-check"></i></span>Te relaja. Reduce el estrés y la ansiedad</li>
            <li class="lista"><span class="li-check fa-li"><i class="fas fa-check"></i></span>Protege, fortalece y flexibiliza tu columna vertebral</li>
            <li class="lista"><span class="li-check fa-li"><i class="fas fa-check"></i></span>Construye músculos fuertes</li>
            <li class="lista"><span class="li-check fa-li"><i class="fas fa-check"></i></span>Te ayuda a conseguir tu peso ideal</li>
            <li class="lista"><span class="li-check fa-li"><i class="fas fa-check"></i></span>Reduce el colesterol</li>
            <li class="lista"><span class="li-check fa-li"><i class="fas fa-check"></i></span>Alivia dolencias de cervical y cuello</li>
            <li class="lista"><span class="li-check fa-li"><i class="fas fa-check"></i></span>Aumenta tu resistencia</li>
    </ul>
    <ul class="list fa-ul" id="list-2" v-if="!ver">
        <li class="lista"><span class="li-check fa-li"><i class="fas fa-check"></i></span>Desarrolla tu concentración</li>
        <li class="lista"><span class="li-check fa-li"><i class="fas fa-check"></i></span>Disminuye el azúcar en la sangre</li>
        <li class="lista"><span class="li-check fa-li"><i class="fas fa-check"></i></span>Previene problemas digestivos</li>
        <li class="lista"><span class="li-check fa-li"><i class="fas fa-check"></i></span>Te ayuda a dormir mejor</li>
        <li class="lista"><span class="li-check fa-li"><i class="fas fa-check"></i></span>Aumenta el flujo de sangre</li>
        <li class="lista"><span class="li-check fa-li"><i class="fas fa-check"></i></span>Desarrolla tu equilibrio</li>
        <li class="lista"><span class="li-check fa-li"><i class="fas fa-check"></i></span>Mejora la salud de tus huesos</li>
        <li class="lista"><span class="li-check fa-li"><i class="fas fa-check"></i></span>Te ayuda a conocerte mejor y tomar decisiones con más claridad</li>
        <li class="lista"><span class="li-check fa-li"><i class="fas fa-check"></i></span>Te conecta con tu verdadera esencia, sin condicionamientos</li>
        <li class="lista"><span class="li-check fa-li"><i class="fas fa-check"></i></span>Mejora tus relaciones personales</li>
    </ul>
     <button  v-on:click="ver = false" v-if="ver">Ver mas</button>
     <button  v-on:click="ver = true" v-if="!ver">Ver anteriores</button>
    </div>
</template>

<style lang="sass">
.lista
    list-style: none
    margin-bottom: 5px;
.fa-li
    color: #7988a3;

button
    background: #ff4081;
    border: none;
    color: #fff;
    padding: 10px 45px;
    margin: auto;
    display: block;
    border-radius: 100px;
    font-size: 18px;
    
</style>

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



