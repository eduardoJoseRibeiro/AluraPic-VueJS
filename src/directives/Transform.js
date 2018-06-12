import Vue from 'vue';

Vue.directive('transform', {
    bind(el, binding, vnode){
        
        let current = 0;

        el.addEventListener('dblclick', function(){
            let incremento = binding.value || 90;
            let animate = false;

            if( binding.modifiers.animate ){
                
                animate = true;
            }

            current += incremento;
            
            el.style.transform = `rotate(${current}deg)`;
            
            if(animate) 
                el.style.transition = "transform 2s ease-out";
        });
    }
});