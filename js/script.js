var schemaObj = {
    elements: {},
    templates: {},
    resistance: {},
    kzId: {},
    calc: {},
    defaultVar: {
        unn: 0.4,
        uvn: 6.3,
        ikz: "",
        arcResistance: 5
    }
};

var symbol = {
    energySystem: 'с',
    transformator: 'т',
    kabelVn: 'кб',
    kabelNn: 'кб',
    shinoprovod: 'ш',
    hookup: 'к',
    tt: 'TA',
    avtomat: 'кв',
    unique: ''
}

var shinoprovodArray = ['|--------', '0.034|0.016|0.19|0.18|Шинопровод ШМА4-1250, Uн=0,38/0,66кВ, Iн=1250А', '0.03|0.014|0.14|0.13|Шинопровод ШМА4-1600, Uн=0,38/0,66кВ, Iн=1600А', '0.01|0.005|0.2|0.12|Шинопровод ШМА4-3200, Uн=0,38/0,66кВ, Iн=3200А', '0.02|0.02|0.23|0.16|Шинопровод ШМА68П, Uн=0,38/0,66кВ, Iн=2500А', '0.013|0.015|0.23|0.15|Шинопровод ШМА68П, Uн=0,38/0,66кВ, Iн=4000А', '0.21|0.21|0.84|0.84|Шинопровод ШРА73, Uн=0,38кВ, Iн=250А', '0.15|0.17|0.64|0.67|Шинопровод ШРА73, Uн=0,38кВ, Iн=400А', '0.1|0.13|0.59|0.62|Шинопровод ШРА73, Uн=0,38кВ, Iн=630А']; //r|x|r нулевого проводника|x нулевого проводника|название (mOm/m)

var transformatorArray = ['|--------', '36.3|66|36.3|66|100кВА Uк=4,5 &#8710;/Yн', '19.3|43|19.3|43|160кВА Uк=4,5 &#8710;/Yн', '10.7|27|10.7|27|250кВА Uк=4,5 &#8710;/Yн', '5.9|17|5.9|17|400кВА Uк=4,5 &#8710;/Yн', '3.4|13.5|3.4|13.5|630кВА Uк=5,5 &#8710;/Yн', '2|8.6|2|8.6|1000кВА Uк=5,5 &#8710;/Yн', '1.9|12.65|1.9|12.65|1000кВА Uк=8 &#8710;/Yн', '1.1|5.4|1.1|5.4|1600кВА Uк=5,5 &#8710;/Yн', '0.64|3.46|0.64|3.46|2500кВА  &#8710;/Yн']; //r|x|r0|x0|название (mOm/m)

var arcArray = ['|--------', '15|КЗ в разделке кабелей за тр-ром 250кВА', '10|КЗ в разделке кабелей за тр-ром 400кВА', '7|КЗ в разделке кабелей за тр-ром 630кВА', '5|КЗ в разделке кабелей за тр-ром 1000кВА', '4|КЗ в разделке кабелей за тр-ром 1600кВА', '3|КЗ в разделке кабелей за тр-ром 2500кВА', '6|КЗ в шинопроводе типа ШМА за тр-ром 1000кВА', '4|КЗ в шинопроводе типа ШМА за тр-ром 1600кВА', '3|КЗ в шинопроводе типа ШМА за тр-ром 2500кВА']; //r|название (mOm/m) Дуга

var hookupArray = ['|--------', '0.085|0|0.085|0|Кабель Al сечением  16 мм&sup2;', '0.064|0|0.064|0|Кабель Al сечением  25 мм&sup2;', '0.056|0|0.056|0|Кабель Al сечением  35 мм&sup2;', '0.043|0|0.043|0|Кабель Al сечением  50 мм&sup2;', '0.029|0|0.029|0|Кабель Al сечением  70 мм&sup2;', '0.027|0|0.027|0|Кабель Al сечением  95 мм&sup2;', '0.024|0|0.024|0|Кабель Al сечением  120 мм&sup2;', '0.021|0|0.021|0|Кабель Al сечением  150 мм&sup2;', '0.012|0|0.012|0|Кабель Al сечением  240 мм&sup2;', '0.009|0|0.009|0|Шинопровод ШРА-73, Iн=250А', '0.006|0|0.006|0|Шинопровод ШРА-73, Iн=400А', '0.004|0|0.004|0|Шинопровод ШРА-73, Iн=630А', '0.003|0|0.003|0|Шинопровод ШМА-73, Iн=1600А', '0.002|0|0.002|0|Шинопровод ШМА-68Н, Iн=2500А', '0.001|0|0.001|0|Шинопровод ШМА-68Н, Iн=4000А', '1.3|0|1.3|0|Разъемное соединение выключателя на 50А', '1|0|1|0|Разъемное соединение выключателя на 70А', '0.75|0|0.75|0|Разъемное соединение выключателя на 100А', '0.65|0|0.65|0|Разъемное соединение выключателя на 150А', '0.6|0|0.6|0|Разъемное соединение выключателя на 200А', '0.4|0|0.4|0|Разъемное соединение выключателя на 400А', '0.25|0|0.25|0|Разъемное соединение выключателя на 600А', '0.12|0|0.12|0|Разъемное соединение выключателя на 1000А', '0.5|0|0.5|0|Разъемное соединение рубильника на 100А', '0.4|0|0.4|0|Разъемное соединение рубильника на 200А', '0.2|0|0.2|0|Разъемное соединение рубильника на 400А', '0.15|0|0.15|0|Разъемное соединение рубильника на 600А', '0.08|0|0.08|0|Разъемное соединение рубильника на 1000А', '0.2|0|0.2|0|Разъемное соединение разъединителя на 400А', '0.15|0|0.15|0|Разъемное соединение разъединителя на 600А', '0.08|0|0.08|0|Разъемное соединение разъединителя на 1000А']; //r|x|r0|x0|название (mOm/m) Контакт

var ttArray = ['|--------', '42|67|42|67|Трансформатор тока 20/5 класс точности 1', '20|30|20|30|Трансформатор тока 30/5 класс точности 1', '11|17|11|17|Трансформатор тока 40/5 класс точности 1', '7|11|7|11|Трансформатор тока 50/5 класс точности 1', '3|4.8|3|4.8|Трансформатор тока 75/5 класс точности 1', '1.7|2.7|1.7|2.7|Трансформатор тока 100/5 класс точности 1', '0.75|1.2|0.75|1.2|Трансформатор тока 150/5 класс точности 1', '0.42|0.67|0.42|0.67|Трансформатор тока 200/5 класс точности 1', '0.2|0.3|0.2|0.3|Трансформатор тока 300/5 класс точности 1', '0.11|0.17|0.11|0.17|Трансформатор тока 400/5 класс точности 1', '0.05|0.07|0.05|0.07|Трансформатор тока 500/5 класс точности 1', '19|17|19|17|Трансформатор тока 20/5 класс точности 3', '8.2|8|8.2|8|Трансформатор тока 30/5 класс точности 3', '4.8|4.2|4.8|4.2|Трансформатор тока 40/5 класс точности 3', '3|2.8|3|2.8|Трансформатор тока 50/5 класс точности 3', '1.3|1.2|1.3|1.2|Трансформатор тока 75/5 класс точности 3', '0.75|0.7|0.75|0.7|Трансформатор тока 100/5 класс точности 3', '0.33|0.3|0.33|0.3|Трансформатор тока 150/5 класс точности 3', '0.19|0.17|0.19|0.17|Трансформатор тока 200/5 класс точности 3', '0.088|0.08|0.088|0.08|Трансформатор тока 300/5 класс точности 3', '0.05|0.04|0.05|0.04|Трансформатор тока 400/5 класс точности 3', '0.02|0.02|0.02|0.02|Трансформатор тока 500/5 класс точности 3'];  //r|x|r0|x0|название (mOm/m)

var avtomatArray = ['|--------', '7|4.5|7|4.5|Автомат на 50А (ВА, А3700)', '3.5|2|3.5|2|Автомат на 70А (ВА, А3700)', '2.15|1.2|2.15|1.2|Автомат на 100А (ВА, А3700)', '1.3|0.7|1.3|0.7|Автомат на 140А (ВА, А3700)', '1.1|0.5|1.1|0.5|Автомат на 200А (ВА, А3700)', '0.65|0.17|0.65|0.17|Автомат на 400А (ВА, А3700)', '0.41|0.13|0.41|0.13|Автомат на 600А (ВА, А3700)', '0.25|0.1|0.25|0.1|Автомат на 1000А (ВА, А3700)', '0.14|0.08|0.14|0.08|Автомат на 1600А (ВА, А3700)', '0.13|0.07|0.13|0.07|Автомат на 2500А (ВА, А3700)', '0.1|0.05|0.1|0.05|Автомат на 4000А (ВА, А3700)'];

var quantityArray = ['1|1', '2|2', '3|3', '4|4'];

var kabelArray = ['|--------', '9.61|0.092|10.95|0.579|3×4  AL (оболочка AL)', '6.41|0.087|7.69|0.523|3×6  AL (оболочка AL)', '3.84|0.082|5.04|0.461|3×10  AL (оболочка AL)', '2.4|0.078|3.52|0.406|3×16  AL (оболочка AL)', '1.54|0.062|2.63|0.359|3×25  AL (оболочка AL)', '1.1|0.061|2.07|0.298|3×35  AL (оболочка AL)', '0.769|0.06|1.64|0.257|3×50  AL (оболочка AL)', '0.549|0.059|1.31|0.211|3×70  AL (оболочка AL)', '0.405|0.057|1.06|0.174|3×95  AL (оболочка AL)', '0.32|0.057|0.92|0.157|3×120  AL (оболочка AL)', '0.256|0.056|0.78|0.135|3×150  AL (оболочка AL)', '0.208|0.056|0.66|0.122|3×185  AL (оболочка AL)', '0.16|0.055|0.553|0.107|3×240  AL (оболочка AL)', '9.61|0.092|11.6|1.24|3×4   AL (оболочка Pb)', '6.41|0.087|8.38|1.2|3×6  AL (оболочка Pb)', '3.84|0.082|5.78|1.16|3×10  AL (оболочка Pb)', '2.4|0.078|4.32|1.12|3×16  AL (оболочка Pb)', '1.54|0.062|3.44|1.07|3×25  AL (оболочка Pb)', '1.1|0.061|2.96|1.01|3×35  AL (оболочка Pb)', '0.769|0.06|2.6|0.963|3×50  AL (оболочка Pb)', '0.549|0.059|2.31|0.884|3×70  AL (оболочка Pb)', '0.405|0.057|2.1|0.793|3×95  AL (оболочка Pb)', '0.32|0.057|1.96|0.742|3×120  AL (оболочка Pb)', '0.256|0.056|1.82|0.671|3×150  AL (оболочка Pb)', '0.208|0.056|1.69|0.606|3×185  AL (оболочка Pb)', '0.16|0.055|1.55|0.535|3×240  AL (оболочка Pb)', '9.61|0.092|11.7|2.31|3×4   AL (оболочка непроводящая)', '6.41|0.087|8.51|2.274|3×6   AL (оболочка непроводящая)', '3.84|0.082|5.94|2.24|3×10   AL (оболочка непроводящая)', '2.4|0.078|4.5|2.2|3×16   AL (оболочка непроводящая)', '1.54|0.062|3.64|2.17|3×25   AL (оболочка непроводящая)', '1.1|0.061|3.3|2.14|3×35   AL (оболочка непроводящая)', '0.769|0.06|2.869|2.08|3×50   AL (оболочка непроводящая)', '0.549|0.059|2.649|2.07|3×70   AL (оболочка непроводящая)', '0.405|0.057|2.505|2.05|3×95   AL (оболочка непроводящая)', '0.32|0.057|2.42|2.03|3×120   AL (оболочка непроводящая)', '0.256|0.056|2.36|2|3×150   AL (оболочка непроводящая)', '9.61|0.098|10.87|0.57|3×4 + 1×2,5   AL (оболочка AL)', '6.41|0.094|7.6|0.463|3×6 + 1×4  AL (оболочка AL)', '3.84|0.088|4.94|0.401|3×10 + 1×6  AL (оболочка AL)', '2.4|0.084|3.39|0.336|3×16 + 1×10  AL (оболочка AL)', '1.54|0.072|2.41|0.256|3×25 + 1×16  AL (оболочка AL)', '1.1|0.068|1.93|0.232|3×35 + 1×16  AL (оболочка AL)', '0.769|0.066|1.44|0.179|3×50 + 1×25  AL (оболочка AL)', '0.549|0.065|1.11|0.145|3×70 + 1×35  AL (оболочка AL)', '0.405|0.064|0.887|0.124|3×95 + 1×50  AL (оболочка AL)', '9.61|0.098|11.52|1.13|3×4 + 1×2,5   AL (оболочка Pb)', '6.41|0.094|8.28|1.05|3×6 + 1×4   AL (оболочка Pb)', '3.84|0.088|5.63|0.966|3×10 + 1×6  AL (оболочка Pb)', '2.4|0.084|4.09|0.831|3×16 + 1×10  AL (оболочка Pb)', '1.54|0.072|3.08|0.668|3×25 + 1×16  AL (оболочка Pb)', '1.1|0.068|2.63|0.647|3×35 + 1×16  AL (оболочка Pb)', '0.769|0.066|2.1|0.5|3×50 + 1×25  AL (оболочка Pb)', '0.549|0.065|1.71|0.393|3×70 + 1×35  AL (оболочка Pb)', '0.405|0.064|1.39|0.317|3×95 + 1×50  AL (оболочка Pb)', '0.32|0.064|1.27|0.301|3×120 + 1×50  AL (оболочка Pb)', '0.256|0.063|1.05|0.248|3×150 + 1×70  AL (оболочка Pb)', '0.208|0.063|0.989|0.244|3×185 + 1×70  AL (оболочка Pb)', '9.61|0.098|11.71|2.11|3×4+1×2,5   AL (оболочка непроводящая)', '6.41|0.094|8.71|1.968|3×6+1×4   AL (оболочка непроводящая)', '3.84|0.088|5.9|1.811|3×10+1×6   AL (оболочка непроводящая)', '2.4|0.084|4.39|1.558|3×16+1×10   AL (оболочка непроводящая)', '1.54|0.072|3.42|1.258|3×25+1×16   AL (оболочка непроводящая)', '1.1|0.068|2.97|1.241|3×35+1×16   AL (оболочка непроводящая)', '0.769|0.066|2.449|0.949|3×50+1×25   AL (оболочка непроводящая)', '0.549|0.065|2.039|0.741|3×70+1×35   AL (оболочка непроводящая)', '0.405|0.064|1.665|0.559|3×95+1×50   AL (оболочка непроводящая)', '0.32|0.064|1.54|0.545|3×120+1×50   AL (оболочка непроводящая)', '0.256|0.063|1.276|0.43|3×150+1×70   AL (оболочка непроводящая)', '3.54|0.094|4.07|1.69|3×6   Cu (оболочка стальная)', '2.13|0.088|2.66|1.65|3×10   Cu (оболочка стальная)', '1.33|0.082|1.86|1.61|3×16   Cu (оболочка стальная)', '0.85|0.082|1.38|1.57|3×25   Cu (оболочка стальная)', '0.61|0.079|1.14|1.54|3×35  Cu (оболочка стальная)', '0.43|0.078|0.96|1.51|3×50  Cu (оболочка стальная)', '0.3|0.065|0.83|1.48|3×70  Cu (оболочка стальная)', '0.22|0.064|0.75|1.45|3×95  Cu (оболочка стальная)', '0.18|0.062|0.71|1.43|3×120  Cu (оболочка стальная)', '0.14|0.061|0.67|1.41|3×150  Cu (оболочка стальная)', '0.115|0.061|0.65|1.39|3×185  Cu (оболочка стальная)', '0.089|0.06|0.62|1.36|3×240  Cu (оболочка стальная)', '3.54|0.1|4.19|1.55|3×6 + 1×4  Cu (оболочка стальная)', '2.13|0.095|2.82|1.46|3×10 + 1×6  Cu (оболочка стальная)', '1.33|0.09|2.07|1.31|3×16 + 1×10  Cu (оболочка стальная)', '0.85|0.089|1.63|1.11|3×25 + 1×16  Cu (оболочка стальная)', '0.61|0.086|1.37|1.09|3×35 + 1×16  Cu (оболочка стальная)', '0.43|0.086|1.18|0.88|3×50 + 1×25   Cu (оболочка стальная)', '0.3|0.073|1.05|0.851|3×70 + 1×25  Cu (оболочка стальная)', '0.3|0.074|1.01|0.654|3×70 + 1×35  Cu (оболочка стальная)', '0.22|0.072|0.92|0.69|3×95 + 1×35  Cu (оболочка стальная)', '0.22|0.072|0.84|0.54|3×95 + 1×50  Cu (оболочка стальная)', '0.18|0.07|0.88|0.68|3×120 + 1×35  Cu (оболочка стальная)', '0.18|0.07|0.7|0.47|3×120 + 1×70  Cu (оболочка стальная)', '0.14|0.061|0.74|0.54|3×150 + 1×50  Cu (оболочка стальная)', '0.14|0.061|0.66|0.42|3×150 + 1×70  Cu (оболочка стальная)', '0.14|0.07|0.7|0.54|3×185 + 1×50  Cu (оболочка стальная)', '0.115|0.069|0.54|0.34|3×185 + 1×95  Cu (оболочка стальная)', '3.54|0.1|4.24|1.49|4×6  Cu (оболочка стальная)', '2.13|0.095|2.88|1.34|4×10  Cu (оболочка стальная)', '1.33|0.09|2.12|1.14|4×16  Cu (оболочка стальная)', '0.85|0.089|1.63|0.91|4×25  Cu (оболочка стальная)', '0.61|0.086|1.33|0.74|4×35  Cu (оболочка стальная)', '0.43|0.086|1.05|0.58|4×50  Cu (оболочка стальная)', '0.3|0.073|0.85|0.42|4×70  Cu (оболочка стальная)', '0.22|0.072|0.66|0.35|4×95  Cu (оболочка стальная)', '0.18|0.07|0.54|0.31|4×120  Cu (оболочка стальная)', '0.14|0.07|0.45|0.28|4×150  Cu (оболочка стальная)', '0.115|0.069|0.37|0.27|4×185  Cu (оболочка стальная)', '16.25|0.126|20.3|1.82|3×1,5  Cu (оболочка непроводящая)', '9.78|0.11|12.2|1.77|3×2,5  Cu (оболочка непроводящая)']; //r|x|r0|x0|название (mOm/m)

var koefUdRX = {"+0": 2, "+0.006": 1.979, "+0.011": 1.965, "+0.017": 1.949, "+0.022": 1.933, "+0.027": 1.917, "+0.033": 1.901, "+0.038": 1.885, "+0.043": 1.869, "+0.049": 1.853, "+0.054": 1.838, "+0.059": 1.822, "+0.065": 1.808, "+0.072": 1.79, "+0.078": 1.773, "+0.088": 1.745, "+0.096": 1.728, "+0.102": 1.713, "+0.11": 1.695, "+0.12": 1.673, "+0.131": 1.653, "+0.147": 1.62, "+0.156": 1.602, "+0.166": 1.586, "+0.174": 1.568, "+0.186": 1.55, "+0.195": 1.533, "+0.206": 1.515, "+0.216": 1.499, "+0.227": 1.482, "+0.243": 1.467, "+0.255": 1.449, "+0.269": 1.435, "+0.285": 1.419, "+0.299": 1.407, "+0.312": 1.392, "+0.328": 1.377, "+0.344": 1.362, "+0.36": 1.351, "+0.376": 1.335, "+0.389": 1.325, "+0.404": 1.306, "+0.418": 1.295, "+0.434": 1.283, "+0.45": 1.271, "+0.466": 1.256, "+0.482": 1.245, "+0.498": 1.232, "+0.514": 1.221, "+0.53": 1.211, "+0.543": 1.205, "+0.557": 1.194, "+0.573": 1.184, "+0.589": 1.175, "+0.61": 1.163, "+0.626": 1.157, "+0.642": 1.15, "+0.658": 1.143, "+0.674": 1.136, "+0.69": 1.128, "+0.706": 1.123, "+0.722": 1.116, "+0.738": 1.111, "+0.754": 1.107, "+0.769": 1.102, "+0.785": 1.094, "+0.801": 1.089, "+0.817": 1.086, "+0.833": 1.081, "+0.849": 1.076, "+0.865": 1.07, "+0.881": 1.065, "+0.897": 1.06, "+0.913": 1.056, "+0.929": 1.051, "+0.945": 1.047, "+0.961": 1.042, "+0.977": 1.041, "+0.993": 1.036, "+1.014": 1.034, "+1.03": 1.028, "+1.046": 1.026, "+1.062": 1.023, "+1.078": 1.02, "+1.094": 1.018, "+1.11": 1.015, "+1.126": 1.014, "+1.142": 1.01, "+1.158": 1.01, "+1.174": 1.007, "+1.19": 1.007 }; //RX:Kуд

var koefUdXR = {"+0.53": 1.002, "+0.623": 1.01, "+0.716": 1.019, "+0.809": 1.028, "+0.902": 1.037, "+0.995": 1.047, "+1.088": 1.058, "+1.182": 1.069, "+1.275": 1.08, "+1.368": 1.092, "+1.461": 1.106, "+1.554": 1.119, "+1.647": 1.134, "+1.74": 1.149, "+1.833": 1.164, "+1.927": 1.18, "+2.02": 1.196, "+2.113": 1.213, "+2.206": 1.231, "+2.299": 1.248, "+2.392": 1.265, "+2.485": 1.282, "+2.578": 1.299, "+2.672": 1.316, "+2.765": 1.332, "+2.858": 1.346, "+2.951": 1.358, "+3.044": 1.37, "+3.137": 1.381, "+3.23": 1.391, "+3.324": 1.402, "+3.417": 1.412, "+3.51": 1.422, "+3.603": 1.43, "+3.696": 1.439, "+3.789": 1.448, "+3.882": 1.456, "+3.975": 1.462, "+4.069": 1.469, "+4.162": 1.476, "+4.255": 1.483, "+4.348": 1.488, "+4.441": 1.493, "+4.534": 1.499, "+4.627": 1.505, "+4.72": 1.51, "+4.814": 1.515, "+4.907": 1.52, "+5": 1.526, "+5.093": 1.531, "+5.838": 1.571, "+6.024": 1.579, "+6.956": 1.623, "+7.049": 1.627, "+7.98": 1.667, "+8.073": 1.671, "+8.911": 1.706, "+9.004": 1.71, "+9.936": 1.744, "+10.029": 1.747, "+10.96": 1.773, "+11.053": 1.775, "+11.892": 1.791, "+12.078": 1.794, "+12.916": 1.807, "+13.009": 1.808, "+14.034": 1.82, "+15.989": 1.837, "+16.082": 1.838, "+17.014": 1.845, "+18.038": 1.848, "+18.131": 1.849, "+19.156": 1.854, "+20.18": 1.857, "+21.205": 1.861, "+22.229": 1.865, "+23.253": 1.867, "+24.278": 1.869, "+25.302": 1.871, "+26.327": 1.872, "+27.351": 1.873, "+28.376": 1.874, "+29.4": 1.874, "+29.773": 1.876, "+30.797": 1.876, "+31.821": 1.877, "+32.846": 1.879, "+33.87": 1.881, "+34.895": 1.883, "+35.919": 1.884, "+36.944": 1.888, "+37.968": 1.889, "+38.992": 1.893, "+40.017": 1.896, "+41.041": 1.9, "+42.066": 1.905, "+43.09": 1.908, "+44.115": 1.911, "+45.139": 1.915, "+46.163": 1.917, "+46.536": 1.918, "+47.56": 1.922, "+48.585": 1.924, "+49.609": 1.927, "+50.634": 1.93, "+57.805": 1.942, "+64.324": 1.951, "+71.495": 1.961, "+78.666": 1.969, "+85.185": 1.979, "+92.356": 1.99, "+100": 2 }; //XR:Kуд

var systemSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="150" height="97.51"><path d="M0 93.48h65v1.5H0z"/><path d="M65 93.48H0v1.5h65v-1.5z"/><path d="M38 34.45h-2v60.03h2V34.45z"/><circle cx="37" cy="94.48" r="2.39"/><path d="M37 92.73a1.78 1.78 0 1 1-1.78 1.78A1.78 1.78 0 0 1 37 92.73m0-1.22a3 3 0 1 0 3 3 3 3 0 0 0-3-3z"/><path d="M20 17.91a17 17 0 1 1 17 17 17 17 0 0 1-17-17zM37 17.91a4.09 4.09 0 0 0 8-1.18M37 17.91a4.09 4.09 0 0 0-8 1.19" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/></svg>';

var transformatorSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="150" height="97.75"><path d="M0 93.75h65v1.5H0z"/><path d="M65 93.75H0v1.5h65v-1.5z"/><circle cx="37" cy="94.75" r="2.39"/><path d="M37 93a1.78 1.78 0 1 1-1.78 1.78A1.78 1.78 0 0 1 37 93m0-1.22a3 3 0 1 0 3 3 3 3 0 0 0-3-3zM36.5 21A12.5 12.5 0 1 1 24 33.5 12.51 12.51 0 0 1 36.5 21m0-2A14.5 14.5 0 1 0 51 33.5 14.5 14.5 0 0 0 36.5 19z"/><path d="M36.5 40A12.5 12.5 0 1 1 24 52.5 12.51 12.51 0 0 1 36.5 40m0-2A14.5 14.5 0 1 0 51 52.5 14.5 14.5 0 0 0 36.5 38z"/><path d="M36 66h2v28h-2z"/><path d="M38 66h-2v28h2V66zM36 0h2v20h-2z"/><path d="M38 0h-2v20h2V0z"/></svg>';

var hookupSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="150" height="97.37"><path d="M0 93.34h65v1.5H0z"/><path d="M38 76.33h-2v18.01h2V76.33zM38 0h-2v14.47h2V0z"/><circle cx="37" cy="94.34" r="2.39"/><path d="M37 92.59a1.78 1.78 0 1 1-1.78 1.78A1.78 1.78 0 0 1 37 92.59m0-1.22a3 3 0 1 0 3 3 3 3 0 0 0-3-3zM38 21h-2v48.06h2V21z"/><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M37 69.88l6.5-9.29M37 69.88l-6.5-9.29M37 76.33l6.5-9.29M37 76.33l-6.5-9.29M37 20.01l6.5 9.29M37 20.01l-6.5 9.29M37 13.56l6.5 9.29M37 13.56l-6.5 9.29"/></svg>';

var ttSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="150" height="97.37"><path d="M0 93.34h65v1.5H0z"/><path d="M38 0h-2v94.34h2V0z"/><circle cx="37" cy="94.34" r="2.39"/><path d="M37 92.59a1.78 1.78 0 1 1-1.78 1.78A1.78 1.78 0 0 1 37 92.59m0-1.22a3 3 0 1 0 3 3 3 3 0 0 0-3-3z"/><path d="M36.37 37a5.44 5.44 0 1 0 0 10.89M36.37 47.88a5.44 5.44 0 0 0 0 10.89M36.37 36.99h12.7M36.37 58.76h12.7M36.37 47.88h1.82" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/><circle cx="47" cy="58.97" r="2.39"/><path d="M47 57.22A1.78 1.78 0 1 1 45.22 59 1.78 1.78 0 0 1 47 57.22M47 56a3 3 0 1 0 3 3 3 3 0 0 0-3-3z"/><circle cx="47" cy="36.97" r="2.39"/><path d="M47 35.22A1.78 1.78 0 1 1 45.22 37 1.78 1.78 0 0 1 47 35.22M47 34a3 3 0 1 0 3 3 3 3 0 0 0-3-3z"/><circle cx="37" cy="29.97" r="2.39"/><path d="M37 28.22A1.78 1.78 0 1 1 35.22 30 1.78 1.78 0 0 1 37 28.22M37 27a3 3 0 1 0 3 3 3 3 0 0 0-3-3z"/><circle cx="37" cy="65.97" r="2.39"/><path d="M37 64.22A1.78 1.78 0 1 1 35.22 66 1.78 1.78 0 0 1 37 64.22M37 63a3 3 0 1 0 3 3 3 3 0 0 0-3-3z"/></svg>';

var klSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="150" height="97.37"><path d="M0 93.34h65v1.5H0z"/><path d="M38 0h-2v94.34h2V0z"/><circle cx="37" cy="94.34" r="2.39"/><path d="M37 92.59a1.78 1.78 0 1 1-1.78 1.78A1.78 1.78 0 0 1 37 92.59m0-1.22a3 3 0 1 0 3 3 3 3 0 0 0-3-3z"/><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M44.83 75.33l-7.86-13.61M36.97 61.72l-7.85 13.61M29.12 75.33h15.71M44.83 18.45l-7.86 13.61M36.97 32.06l-7.85-13.61M29.12 18.45h15.71"/></svg>';

var avtomatSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="150" height="97.37"><path d="M0 93.34h65v1.5H0z"/><path d="M65 93.34H0v1.5h65v-1.5z"/><path d="M38 52.31h-2v42.03h2V52.31zM38 0h-2v35.3h2V0z"/><circle cx="37" cy="94.34" r="2.39"/><path d="M37 92.59a1.78 1.78 0 1 1-1.78 1.78A1.78 1.78 0 0 1 37 92.59m0-1.22a3 3 0 1 0 3 3 3 3 0 0 0-3-3z"/><path fill="none" stroke="#020202" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M28.51 37.58l8.5 14.73M30.54 50.16l3.92-2.27M34.46 47.89L31.06 42M31.06 42l-3.93 2.27M27.13 44.27l3.41 5.89"/></svg>';

var reportSysSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="64.99" height="97.4"><path d="M0 93.37h64.99v1.5H0z"/><path d="M64.99 93.37H0v1.5h64.99v-1.5z"/><path d="M37.99 76.18H36v18.19h1.99V76.18zM37.99 34.63H36v13.46h1.99V34.63z"/><circle cx="37" cy="94.37" r="2.39"/><path d="M37 92.62a1.78 1.78 0 1 1-1.78 1.78A1.78 1.78 0 0 1 37 92.62m0-1.22a3 3 0 1 0 3 3 3 3 0 0 0-3-3z"/><path d="M37 57.27a5 5 0 0 0 0-9.9M37 67.17a5 5 0 0 0 0-9.9M37 77a5 5 0 0 0 0-9.9" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"/><path d="M20 17.9a17 17 0 1 1 17 17 17 17 0 0 1-17-17z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/><path d="M37 31.7l2.55-14.17L37 18.95l-2.55-1.42L37 31.7z"/><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M37 18.95V4.09"/></svg>';

var reportRxSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="150" height="97.75"><path d="M0 93.75h65v1.5H0z"/><path d="M65 93.75H0v1.5h65v-1.5z"/><circle cx="37" cy="94.75" r="2.39"/><path d="M37 93a1.78 1.78 0 1 1-1.78 1.78A1.78 1.78 0 0 1 37 93m0-1.22a3 3 0 1 0 3 3 3 3 0 0 0-3-3z"/><path d="M36 80h2v14h-2z"/><path d="M38 80h-2v14h2V80zM36 0h2v15.78h-2z"/><path d="M38 0h-2v15.78h2V0zM41 54v25h-8V54h8m2-2H31v29h12V52z"/><path d="M37 24.9a4.95 4.95 0 1 0 0-9.9M37 34.8a4.95 4.95 0 0 0 0-9.9M37 44.7a4.95 4.95 0 1 0 0-9.9" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"/><path d="M36 43.87h2v9.91h-2z"/><path d="M38 43.88h-2v9.9h2v-9.9z"/></svg>';

var reportRSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="150" height="97.75"><path d="M0 93.75h65v1.5H0z"/><path d="M65 93.75H0v1.5h65v-1.5z"/><path d="M36 64.5h2v30.25h-2z"/><path d="M38 64.5h-2v30.25h2V64.5zM36 0h2v38.25h-2z"/><path d="M38 0h-2v38.25h2V0z"/><circle cx="37" cy="94.75" r="2.39"/><path d="M37 93a1.78 1.78 0 1 1-1.78 1.78A1.78 1.78 0 0 1 37 93m0-1.22a3 3 0 1 0 3 3 3 3 0 0 0-3-3zM41 39v25h-8V39h8m2-2H31v29h12V37z"/></svg>';

var reportXSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="150" height="97.75"><path d="M0 93.75h65v1.5H0z"/><path d="M65 93.75H0v1.5h65v-1.5z"/><path d="M36 66.45h2v28.3h-2z"/><path d="M38 66.45h-2v28.3h2v-28.3zM36 0h2v36.75h-2z"/><path d="M38 0h-2v36.75h2V0z"/><circle cx="37" cy="94.75" r="2.39"/><path d="M37 93a1.78 1.78 0 1 1-1.78 1.78A1.78 1.78 0 0 1 37 93m0-1.22a3 3 0 1 0 3 3 3 3 0 0 0-3-3z"/><path d="M37 46.65a4.95 4.95 0 0 0 0-9.9M37 56.55a4.95 4.95 0 0 0 0-9.9M37 66.45a4.95 4.95 0 0 0 0-9.9" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"/></svg>';

var koefRXSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="318" height="264" viewBox="0 0 239 198"><path d="M23 1l11 32 13 29c4 10 9 20 15 28a167 167 0 0 0 16 18 243 243 0 0 0 47 39c13 7 27 12 41 17a319 319 0 0 0 36 10 331 331 0 0 0 35 5" fill="none" stroke="#00f" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M23 179h214"/><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M237 179V1m0 0H23"/><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M23 1v178"/><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M237 37H23m214 35H23m214 36H23m214 36H23m179 35V1m-36 178V1m-36 178V1M94 179V1M59 179V1"/><text transform="matrix(.93 0 0 1 19 193)" font-size="13" font-family="Arial Narrow">0</text><text transform="matrix(.93 0 0 1 49 193)" font-size="13" font-family="Arial Narrow">0,2</text><text transform="matrix(.93 0 0 1 84 193)" font-size="13" font-family="Arial Narrow">0,4</text><text transform="matrix(.93 0 0 1 120 193)" font-size="13" font-family="Arial Narrow">0,6</text><text transform="matrix(.93 0 0 1 156 193)" font-size="13" font-family="Arial Narrow">0,8</text><text transform="matrix(.93 0 0 1 196 193)" font-size="13" font-family="Arial Narrow">1</text><text transform="matrix(.93 0 0 1 0 146)" font-size="13" font-family="Arial Narrow">1,2</text><text transform="matrix(.93 0 0 1 2 182)" font-size="13" font-family="Arial Narrow">1</text><text transform="matrix(.93 0 0 1 0 111)" font-size="13" font-family="Arial Narrow">1,4</text><text transform="matrix(.93 0 0 1 0 75)" font-size="13" font-family="Arial Narrow">1,6</text><text transform="matrix(.93 0 0 1 0 39)" font-size="13" font-family="Arial Narrow">1,8</text><text transform="matrix(.93 0 0 1 0 12)" font-size="13" font-family="Arial Narrow"><tspan letter-spacing="0em">К</tspan><tspan x="7" y="0" letter-spacing="0em">у</tspan><tspan x="12" y="0">д</tspan></text><text transform="matrix(.93 0 0 1 222 195)" font-size="13" font-family="Arial Narrow">R/X</text></svg>';

var koefXRSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="414" height="264" viewBox="0 0 311 198"><path d="M309 1l-36 5-36 7a254 254 0 0 0-36 13c-12 6-24 12-35 20-10 8-19 17-27 27-9 11-15 24-23 35s-12 26-22 36a111 111 0 0 1-35 26 109 109 0 0 1-36 9" fill="none" stroke="#00f" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M23 1v178"/><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M309 179V1M309 1H23"/><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M23 179h286"/><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" d="M273 179V1M237 179V1M202 179V1M166 179V1M130 179V1M94 179V1M59 179V1M23 144h286M23 108h286M23 72h286M23 37h286"/><text transform="matrix(.93 0 0 1 13 193)" font-size="13" font-family="Arial Narrow">0,5</text><text transform="matrix(.93 0 0 1 54 193)" font-size="13" font-family="Arial Narrow">1</text><text transform="matrix(.93 0 0 1 90 193)" font-size="13" font-family="Arial Narrow">2</text><text transform="matrix(.93 0 0 1 126 193)" font-size="13" font-family="Arial Narrow">5</text><text transform="matrix(.93 0 0 1 158 193)" font-size="13" font-family="Arial Narrow">10</text><text transform="matrix(.93 0 0 1 195 193)" font-size="13" font-family="Arial Narrow">20</text><text transform="matrix(.93 0 0 1 0 146)" font-size="13" font-family="Arial Narrow">1,2</text><text transform="matrix(.93 0 0 1 2 182)" font-size="13" font-family="Arial Narrow">1</text><text transform="matrix(.93 0 0 1 0 111)" font-size="13" font-family="Arial Narrow">1,4</text><text transform="matrix(.93 0 0 1 0 75)" font-size="13" font-family="Arial Narrow">1,6</text><text transform="matrix(.93 0 0 1 0 39)" font-size="13" font-family="Arial Narrow">1,8</text><text transform="matrix(.93 0 0 1 231 193)" font-size="13" font-family="Arial Narrow">50</text><text transform="matrix(.93 0 0 1 262 193)" font-size="13" font-family="Arial Narrow">100</text><text transform="matrix(.93 0 0 1 0 12)" font-size="13" font-family="Arial Narrow"><tspan letter-spacing="0em">К</tspan><tspan x="7" y="0" letter-spacing="0em">у</tspan><tspan x="12" y="0">д</tspan></text><text transform="matrix(.93 0 0 1 294 195)" font-size="13" font-family="Arial Narrow">X/R</text></svg>';

var pointKzSvg = '<svg id="Слой_1" xmlns="http://www.w3.org/2000/svg" width="12.7" height="27.3"><style>.st0{fill:#ae0a02}</style><path class="st0" d="M11.5 27.3l1.2-8.3-5.2.9z"/><path transform="rotate(-9.915 9.23707 14.30475)" class="st0" d="M8.5 8.7h1.4v11.2H8.5z"/><path transform="rotate(-9.915 1.91564 7.02448)" class="st0" d="M1.2 0h1.4v14H1.2z"/><path transform="rotate(-45.26 5.87956 10.71918)" class="st0" d="M2.2 10h7.3v1.4H2.2z"/></svg>';

var energySystemTemplate = [
    new InitTemplateItem('input', 'energySystemUvn', 'form-control w1', schemaObj.defaultVar.uvn, null, '<i>U</i><sub>с.ВН</sub> = ', 'changeElementValue', '<div class=\"form-group\">', '</div>', ' кВ', null),
    new InitTemplateItem('input', 'energySystemUnn', 'form-control w1', schemaObj.defaultVar.unn, null, '<i>U</i><sub>с.НН</sub> = ', 'changeElementValue', '<div class=\"form-group\">', '</div>', ' кВ', null),
    new InitTemplateItem('input', 'energySystemIkz', 'form-control w1', schemaObj.defaultVar.ikz, null, '<i>I</i><sub>к.ВН</sub><sup>(3)</sup> = ', 'changeElementValue', '<div class=\"form-group\">', '</div>', ' кА', null),
];
var transformatorTemplate = [
    new InitTemplateItem('select', 'transformator', 'form-control', null, null, '<i>Трансформатор</i> = ', 'changeElementValue', '<div class=\"form-group\">', '</div>', '', 'transformatorArray')
];
var kabelVnTemplate = [
    new InitTemplateItem('select', 'kabelVn', 'form-control w2', null, null, '<i>Кабель</i> = ', 'changeElementValue', '<div class=\"form-group\">', '</div>', '', 'kabelArray'),
    new InitTemplateItem('input', 'kabelVnLength', 'form-control w1', '1', null, '<i>Длина</i> = ', 'changeElementValue', '<div class=\"form-group\">', '</div>', ' м', null),
    new InitTemplateItem('select', 'kabelVnQuantity', 'form-control', '1', null, '<i>Кол-во</i> = ', 'changeElementValue', '<div class=\"form-group\">', '</div>', ' шт.', 'quantityArray')
];
var kabelNnTemplate = [
    new InitTemplateItem('select', 'kabelNn', 'form-control w2', null, null, '<i>Кабель</i> = ', 'changeElementValue', '<div class=\"form-group\">', '</div>', '', 'kabelArray'),
    new InitTemplateItem('input', 'kabelNnLength', 'form-control w1', '1', null, '<i>Длина</i> = ', 'changeElementValue', '<div class=\"form-group\">', '</div>', ' м', null),
    new InitTemplateItem('select', 'kabelNnQuantity', 'form-control', '1', null, '<i>Кол-во</i> = ', 'changeElementValue', '<div class=\"form-group\">', '</div>', ' шт.', 'quantityArray')
];
var shinoprovodTemplate = [
    new InitTemplateItem('select', 'shinoprovod', 'form-control w2', null, null, '<i>Шинопровод</i> = ', 'changeElementValue', '<div class=\"form-group\">', '</div>', '', 'shinoprovodArray'),
    new InitTemplateItem('input', 'shinoprovodLength', 'form-control w1', '1', null, '<i>Длина</i> = ', 'changeElementValue', '<div class=\"form-group\">', '</div>', ' м', null)
];
var hookupTemplate = [
    new InitTemplateItem('select', 'hookup', 'form-control w2', null, null, '<i>Контактные соединения</i> = ', 'changeElementValue', '<div class=\"form-group\">', '</div>', '', 'hookupArray'),
    new InitTemplateItem('input', 'hookupQuantity', 'form-control w1', '1', null, '<i>Кол-во</i> = ', 'changeElementValue', '<div class=\"form-group\">', '</div>', ' шт.', null)
];
var ttTemplate = [
    new InitTemplateItem('select', 'tt', 'form-control w2', null, null, '<i>Трансформатор тока</i> = ', 'changeElementValue', '<div class=\"form-group\">', '</div>', '', 'ttArray'),
    new InitTemplateItem('input', 'ttQuantity', 'form-control w1', '1', null, '<i>Кол-во</i> = ', 'changeElementValue', '<div class=\"form-group\">', '</div>', ' шт.', null)
];
var avtomatTemplate = [
    new InitTemplateItem('select', 'avtomat', 'form-control w2', null, null, '<i>Автомат </i> = ', 'changeElementValue', '<div class=\"form-group\">', '</div>', '', 'avtomatArray'),
    new InitTemplateItem('input', 'avtomatQuantity', 'form-control w1', '1', null, '<i>Кол-во</i> = ', 'changeElementValue', '<div class=\"form-group\">', '</div>', ' шт.', null)
];
var uniqueTemplate = [
    new InitTemplateItem('input', 'uniqueR', 'form-control w1', '', null, '<i>R</i> = ', 'changeElementValue', '<div class=\"form-group\">', '</div>', ' мОм', null),
    new InitTemplateItem('input', 'uniqueX', 'form-control w1', '', null, '<i>X</i> = ', 'changeElementValue', '<div class=\"form-group\">', '</div>', ' мОм', null),
    new InitTemplateItem('input', 'uniqueR0', 'form-control w1', '', null, '<i>R</i><sub>0</sub> = ', 'changeElementValue', '<div class=\"form-group\">', '</div>', ' мОм', null),
    new InitTemplateItem('input', 'uniqueX0', 'form-control w1', '', null, '<i>X</i><sub>0</sub> = ', 'changeElementValue', '<div class=\"form-group\">', '</div>', ' мОм', null),
];

var energySystemResistance = {r: null, x: null, r0: null, x0: null};
var transformatorResistance = {r: null, x: null, r0: null, x0: null};
var kabelVnResistance = {r: null, x: null, r0: null, x0: null};
var kabelNnResistance = {r: null, x: null, r0: null, x0: null};
var shinoprovodResistance = {r: null, x: null, r0: null, x0: null};
var hookupResistance = {r: null, x: null, r0: null, x0: null};
var ttResistance = {r: null, x: null, r0: null, x0: null};
var avtomatResistance = {r: null, x: null, r0: null, x0: null};
var uniqueResistance = {r: null, x: null, r0: null, x0: null};


var energySystemObj = new ElementsDataObj('energySystem', 'Энергосистема', null, null, null, '<div class=\"form-inline\">{tpl}</div>');
var transformatorObj = new ElementsDataObj('transformator', 'Трансформатор', null, null, null, '<div class=\"form-inline\">{tpl}</div>');
var kabelVnObj = new ElementsDataObj('kabelVn', 'Кабельная линия ВН', null, null, null, '<div class=\"form-inline\">{tpl}</div>');
var kabelNnObj = new ElementsDataObj('kabelNn', 'Кабельная линия НН', null, null, null, '<div class=\"form-inline\">{tpl}</div>');
var shinoprovodObj = new ElementsDataObj('shinoprovod', 'Шинопровод', null, null, null, '<div class=\"form-inline\">{tpl}</div>');
var hookupObj = new ElementsDataObj('hookup', 'Контактные соединения', null, null, null, '<div class=\"form-inline\">{tpl}</div>');
var ttObj = new ElementsDataObj('tt', 'Трансформатор тока', null, null, null, '<div class=\"form-inline\">{tpl}</div>');
var avtomatObj = new ElementsDataObj('avtomat', 'Автоматический выключатель', null, null, null, '<div class=\"form-inline\">{tpl}</div>');
var uniqueObj = new ElementsDataObj('unique', 'Свой элемент', null, null, null, '<div class=\"form-inline\">{tpl}</div>');

var elementObj = {
    energySystem: energySystemObj,
    transformator: transformatorObj,
    kabelVn: kabelVnObj,
    kabelNn: kabelNnObj,
    shinoprovod: shinoprovodObj,
    hookup: hookupObj,
    tt: ttObj,
    avtomat: avtomatObj,
    unique: uniqueObj,
};

var templateObj = {
    energySystem: energySystemTemplate,
    transformator: transformatorTemplate,
    kabelVn: kabelVnTemplate,
    kabelNn: kabelNnTemplate,
    shinoprovod: shinoprovodTemplate,
    hookup: hookupTemplate,
    tt: ttTemplate,
    avtomat: avtomatTemplate,
    unique: uniqueTemplate,
};

var resistanceObj = {
    energySystem: energySystemResistance,
    transformator: transformatorResistance,
    kabelVn: kabelVnResistance,
    kabelNn: kabelNnResistance,
    shinoprovod: shinoprovodResistance,
    hookup: hookupResistance,
    tt: ttResistance,
    avtomat: avtomatResistance,
    unique: uniqueResistance,
};

var textSelectEl = '<p class=\"text-danger\">Выберите элемент сети!</p>';
var textAddEl = '<p class=\"text-danger\">Добавьте элемент сети!</p>';
var textAddPointKz = '<p class=\"text-danger\">Укажите точку КЗ!</p>';
var textAddData = '<p class=\"text-danger\">Введите даные!</p>';
var textLocalError = '<p class=\"text-danger\">Ошибка при обращении к локальному хранилищу</p>';
var textDontHaveSavProject = '<p class=\"text-danger\">У Вас нет сохраненных проектов!</p>';
var textProjectSaved = '<p class=\"text-success\">Спасибо, ваш проект сохранен!</p>';
var textProjectSendSaved = '<p class=\"text-success\">Спасибо, ваш проект сохранен в файл. Если он не загрузился автоматически, то нажмите кнопку \"Сохранить\" в диалоговом окне.</p>';
var textSaveFileError = '<p class=\"text-danger\">Ошибка при сохранении проекта в файл!</p>';

window.onload = function () {
    var elementSelect = document.getElementById("elementSelect");
    var arcSelectVar = document.getElementById("arcSelect");
    var arcInputVar = document.getElementById("arcInput");
    elementSelect.innerHTML = addElementsSelect();
    arcSelectVar.innerHTML = addOption(arcArray, schemaObj.defaultVar.arcResistance);
    arcInputVar.value = schemaObj.defaultVar.arcResistance;

    arcSelectVar.addEventListener("change", function () {
        schemaObj.defaultVar.arcResistance = arcSelectVar.value;
        arcInputVar.value = schemaObj.defaultVar.arcResistance;
    });

    arcInputVar.addEventListener("change", function () {
        schemaObj.defaultVar.arcResistance = convertingData(arcInputVar.value);
        arcSelectVar.innerHTML = addOption(arcArray, schemaObj.defaultVar.arcResistance);
    });
}

function ElementsDataObj(key, name, title, rowId, pointKz, tplWrp) {
    this.key = key;
    this.name = name;
    this.title = title;
    this.rowId = rowId;
    this.pointKz = pointKz;
    this.tplWrp = htmlEncode(tplWrp);
}

function InitTemplateItem(typeItem, idItem, classItem, valueItem, textItem, labelItem, functionItem, wrapperItemStart, wrapperItemEnd, suffixItem, outerData) {
    this.typeItem = typeItem;
    this.idItem = idItem;
    this.classItem = classItem;
    this.valueItem = valueItem;
    this.textItem = textItem;
    this.labelItem = htmlEncode(labelItem);
    this.functionItem = functionItem;
    this.wrapperItemStart = htmlEncode(wrapperItemStart);
    this.wrapperItemEnd = htmlEncode(wrapperItemEnd);
    this.suffixItem = suffixItem;
    this.outerData = outerData;
}

function addElementsSelect() {
    let html = '<option value=\"\">--- Выбор элемента сети ---</option>';
    for (let key in elementObj) {
        html += '<option value=' + key + '>' + elementObj[key].name + '</option>';
    }
    return html;
}

function addOption(arrayStr, value) {
    let array = eval(arrayStr);
    let html = '';
    let arraySplit;
    for (let i = 0; i < array.length; i++) {
        let selected = '';
        let arraySplit = array[i].split('|');
        let text = arraySplit.pop();
        let val = arraySplit.join('|');
        if (value == val) {
            selected = 'selected';
        }
        html += '<option value=\"' + val + '\" ' + selected + '>' + text + '</option>';
    }
    return html;
}

function prepareTemplate(data) {
    let obj = [];
    for (let i = 0; i < data.length; i++) {
        obj[i] = Object.assign({}, data[i]);
    }
    return obj;
}

function renderTemplateItemData(element, rowId, insert) {
    if (insert === true) {
        insert = true;
    } else {
        insert = false;
    }
    let template = prepareTemplate(templateObj[element]);
    if (insert === true) {
        template = prepareTemplate(schemaObj.templates[rowId]);
    }
    let html = '';
    let tplWrp = schemaObj.elements[rowId].tplWrp;
    if (tplWrp !== null) {
        tplWrp = tplWrp.split('{tpl}');
    } else {
        tplWrp = ['', '']
    }
    html += htmlDecode(tplWrp[0]);
    for (let i = 0; i < template.length; i++) {
        let functionItem = '';
        if (template[i].functionItem !== null) {
            functionItem = 'onchange=\"changeElementValue(this.id, ' + rowId + ')\"';
        }
        let valueItem = template[i].valueItem;
        if (template[i].valueItem === null) {
            valueItem = '';
        }
        if (template[i].typeItem == "input") {
            html += htmlDecode(template[i].wrapperItemStart);
            html += '<label for=\"' + template[i].idItem + rowId + '\">' + htmlDecode(template[i].labelItem) + '</label>';
            html += '<input id=\"' + template[i].idItem + rowId + '\" ' + functionItem + ' class=\"' + template[i].classItem + '\" type=\"text\" name=\"' + template[i].idItem + '[' + rowId + ']\" value=\"' + valueItem + '\" data-templateArrayKey=\"' + [i] + '\">' + template[i].suffixItem;
            html += htmlDecode(template[i].wrapperItemEnd);
        } else if (template[i].typeItem == "select") {
            html += htmlDecode(template[i].wrapperItemStart);
            html += '<label for=\"' + template[i].idItem + rowId + '\">' + htmlDecode(template[i].labelItem) + '</label>';
            html += '<select id=\"' + template[i].idItem + rowId + '\" ' + functionItem + ' class=\"' + template[i].classItem + '\" name=\"' + template[i].idItem + '[' + rowId + ']\" data-templateArrayKey=\"' + [i] + '\">';
            html += addOption(template[i].outerData, template[i].valueItem);
            html += '</select>' + template[i].suffixItem;
            html += htmlDecode(template[i].wrapperItemEnd);
        }
    }
    html += htmlDecode(tplWrp[1]);
    return html;
}

function renderItemScheme(element, rowId, insert = null) {
    let img;
    let resistanceData = '';
    if (element == 'energySystem') {
        img = systemSvg;
    } else if (element == 'transformator') {
        img = transformatorSvg;
    } else if (element == 'kabelVn' || element == 'kabelNn') {
        img = klSvg;
    } else if (element == 'shinoprovod') {
        img = klSvg;
    } else if (element == 'hookup') {
        img = hookupSvg;
    } else if (element == 'tt') {
        img = ttSvg;
    } else if (element == 'avtomat') {
        img = avtomatSvg;
    } else {
        img = klSvg;
    }
    if (insert !== null) {
        resistanceData = insert;
    }
    let pointKz = '';
    let pointKzImg = '';
    if (schemaObj.elements[rowId].pointKz !== null) {
        pointKz = ' pointKz';
        pointKzImg = '<span>К'+ rowId +'</span> '+ pointKzSvg;
    }
    let html = '';
    html += '<div id=\"' + element + 'Img' + rowId + '\" class=\"' + element + 'Img' + pointKz + '\">';
    html += '   <div id=\"' + element + 'Resistance' + rowId + '\" class=\"resistanceData\">' + resistanceData + '</div>';
    html += '   <div id=\"pointKzWrapper' + rowId + '\" class=\"pointKzWrapper\">'+ pointKzImg +'</div>';
    html += img;
    html += '</div>';
    return html;
}

function renderItemPointKz(element, rowId, pointKz = null) {
    let html = '';
    let checked = '';
    if (pointKz !== null) {
        checked = 'checked';
    }
    html += '<input id=\"' + element + 'Checkbox' + rowId + '\" type=\"checkbox\" onchange=\"changeCheckbox(this.id, ' + rowId + ')\" name=\"' + element + 'Checkbox[' + rowId + ']\" ' + checked + '>';
    return html;
}

function deleteRow(rowId) {
    document.getElementById("row" + rowId + "").outerHTML = "";
    delete schemaObj.elements[rowId];
    delete schemaObj.templates[rowId];
    delete schemaObj.resistance[rowId];
    delete schemaObj.kzId[rowId];
    delete schemaObj.calc[rowId];
}

function addRow() {
    let elementSelect = document.getElementById("elementSelect").value;
    if (elementSelect != '') {
        let html = "";
        let table = document.getElementById("tableKz");
        let rowId = (table.rows.length) - 1;
        elementObj[elementSelect].rowId = rowId;
        schemaObj.elements[rowId] = Object.assign({}, elementObj[elementSelect]);
        schemaObj.templates[rowId] = prepareTemplate(templateObj[elementSelect]);
        schemaObj.resistance[rowId] = Object.assign({}, resistanceObj[elementSelect]);
        html += "<tr id='row" + rowId + "'>";
        html += "   <td id='elementSelect" + rowId + "'>";
        html += "       <div class='form-inline'>";
        html += "           <div class='form-group'><label>" + rowId + "</label>&nbsp;";
        html += "               <input id='elementSelectVal" + rowId + "' class='form-control select' type='text' name='elementSelectVal[" + rowId + "]' onchange='changeElementTitleValue(this.id," + rowId + ")' value='" + elementObj[elementSelect].name + "'>";
        html += "           </div>";
        html += "       </div>";
        html += "   </td>";
        html += "   <td id='elementScheme" + rowId + "' class='elementScheme'>" + renderItemScheme(elementSelect, rowId) + "</td>";
        html += "   <td id='elementData" + rowId + "' class='elementData'>" + renderTemplateItemData(elementSelect, rowId) + "</td>";
        html += "   <td id='pointKz" + rowId + "' class='elementPointKz'>" + renderItemPointKz(elementSelect, rowId) + "</td>";
        html += "   <td><input type='button' value='Удалить' class='delete btn btn-danger' onclick='deleteRow(" + rowId + ")'></td>";
        html += "</tr>";
        let row = table.insertRow(rowId).outerHTML = html;
    } else {
        customModal(textSelectEl);
    }
}

function changeElementValue(elementId, rowId) {
    let element = document.getElementById(elementId);
    let elementValue = element.value;
    let templateArrayKey = element.getAttribute('data-templateArrayKey');
    let elementText = null;
    let data;
    if (schemaObj.templates[rowId][templateArrayKey].typeItem == "select") {
        elementText = element.options[element.selectedIndex].text;
        if (elementValue == '' || elementValue === null) {
            elementValue = null;
        }
        schemaObj.templates[rowId][templateArrayKey].valueItem = elementValue;
    } else {
        data = convertingData(elementValue);
        if (data == '' || data == 0 ||data === null) {
            data = null;
        }
        schemaObj.templates[rowId][templateArrayKey].valueItem = data;
        element.value = data;
    }
    schemaObj.templates[rowId][templateArrayKey].textItem = elementText;
    calcResistance(rowId);
    addResistance(rowId);
    console.log(schemaObj);
}

function changeElementTitleValue(elementId, rowId) {
    let element = document.getElementById(elementId);
    let elementValue = element.value;
    schemaObj.elements[rowId].title = elementValue.replace(/[\\\|\'\"\#^\:\;\\$\%\&\?\/]/g, '');
}

function changeCheckbox(elementId, rowId) {
    let checkbox = document.getElementById(elementId);
    let img = document.getElementById(elementId.replace('Checkbox', 'Img'));
    let pointKzWrapper = document.getElementById("pointKzWrapper"+rowId);
    if (checkbox.checked) {
        schemaObj.kzId[rowId] = elementId;
        schemaObj.elements[rowId].pointKz = rowId;
        img.classList.add('pointKz');
        pointKzWrapper.innerHTML = '<span>К'+ rowId +'</span> '+ pointKzSvg;
    } else {
        delete schemaObj.kzId[rowId];
        schemaObj.elements[rowId].pointKz = null;
        img.classList.remove('pointKz');
        pointKzWrapper.innerHTML = '';
    }
}

function calcResistance(rowId) {
    let element = schemaObj.elements[rowId];
    let template = schemaObj.templates[rowId];
    let resistance = schemaObj.resistance[rowId];
    let r = null, x = null, r0 = null, x0 = null;
    if (element.key == 'energySystem') {
        let uvn = template[0].valueItem;
        let unn = template[1].valueItem;
        let ikz = template[2].valueItem;
        if (uvn === null || unn === null || ikz === null) {
            r=x=r0=x0=null;
        } else {
        schemaObj.defaultVar.uvn = uvn;
        schemaObj.defaultVar.unn = unn;
        schemaObj.defaultVar.ikz = ikz;
        let xcvn = uvn / (Math.sqrt(3) * ikz);
        r = 0;
        x = 1000 * xcvn * Math.pow((unn / uvn), 2);
        r0 = 0;
        x0 = 0;
    }
    } else if (element.key == 'transformator') {
        let transformatorValue = template[0].valueItem;
        if (transformatorValue === null) {
            r=x=r0=x0=null;
        } else {
        let transformatorResist = transformatorValue.split('|');
        r = transformatorResist[0] * 1;
        x = transformatorResist[1] * 1;
        r0 = transformatorResist[2] * 1;
        x0 = transformatorResist[3] * 1;
    }
    } else if (element.key == 'kabelVn' || element.key == 'kabelNn') {
        let kabel = template[0].valueItem;
        let kabelLength = template[1].valueItem;
        let kabelQuantity = template[2].valueItem;
        if (kabel === null) {
            r=x=r0=x0=null;
        } else {
        let kabelValue = kabel.split('|');
        let kabelResist = [];
        let vnToNn = 1;
        if (element.key == 'kabelVn') {
            vnToNn = (Math.pow(schemaObj.defaultVar.unn, 2) / (Math.pow(schemaObj.defaultVar.uvn, 2)));
        }
        for (let i = 0; i < kabelValue.length; i++) {
            kabelResist[i] = ((kabelValue[i] * kabelLength) / kabelQuantity) * vnToNn;
        }
        r = kabelResist[0];
        x = kabelResist[1];
        r0 = kabelResist[2];
        x0 = kabelResist[3];
    }
    } else if (element.key == 'shinoprovod') {
        let shnp = template[0].valueItem;
        let shnpLength = template[1].valueItem;
        if (shnp === null) {
            r=x=r0=x0=null;
        } else {
        let shnpValue = shnp.split('|');
        r = shnpValue[0] * shnpLength;
        x = shnpValue[1] * shnpLength;
        r0 = (shnpValue[0] * shnpLength) + (3 * shnpValue[2] * shnpLength);
        x0 = (shnpValue[1] * shnpLength) + (3 * shnpValue[3] * shnpLength);
    }
    } else if (element.key == 'hookup') {
        let hookup = template[0].valueItem;
        let hookupQuantity = template[1].valueItem;
        if (hookup === null) {
            r=x=r0=x0=null;
        } else {
        let hookupValue = hookup.split('|');
        r = hookupValue [0] * hookupQuantity;
        x = 0;
        r0 = hookupValue [2] * hookupQuantity;
        x0 = 0;
    }
    } else if (element.key == 'tt' || element.key == 'avtomat') {
        let tt = template[0].valueItem;
        let ttQuantity = template[1].valueItem;
        if (tt === null) {
            r=x=r0=x0=null;
        } else {
        let ttValue = tt.split('|');
        r = ttValue [0] * ttQuantity;
        x = ttValue [1] * ttQuantity;
        r0 = ttValue [2] * ttQuantity;
        x0 = ttValue [3] * ttQuantity;
    }
    } else if (element.key == 'unique') {
        r = template[0].valueItem * 1;
        x = template[1].valueItem * 1;
        r0 = template[2].valueItem * 1;
        x0 = template[3].valueItem * 1;
    }
    resistance.r = r;
    resistance.x = x;
    resistance.r0 = r0;
    resistance.x0 = x0;
}

function addResistance(rowId, insert = false) {
    let html = '<span>';
    if (schemaObj.resistance[rowId].r !== null) {
        if (schemaObj.resistance[rowId].r !== 0) {
            html += 'R<sub>' + symbol[schemaObj.elements[rowId].key] + '</sub>=' + customRound(schemaObj.resistance[rowId].r) + ' мОм<br>';
        }
    }
    if (schemaObj.resistance[rowId].x !== null) {
        if (schemaObj.resistance[rowId].x !== 0) {
            html += 'X<sub>' + symbol[schemaObj.elements[rowId].key] + '</sub>=' + customRound(schemaObj.resistance[rowId].x) + ' мОм<br>';
        }
    }
    if (schemaObj.resistance[rowId].r0 !== null) {
        if (schemaObj.resistance[rowId].r0 !== 0) {
            html += 'R<sub>0' + symbol[schemaObj.elements[rowId].key] + '</sub>=' + customRound(schemaObj.resistance[rowId].r0) + ' мОм<br>';
        }   
    }
    if (schemaObj.resistance[rowId].x0 !== null) {
        if (schemaObj.resistance[rowId].x0 !== 0) {
            html += 'X<sub>0' + symbol[schemaObj.elements[rowId].key] + '</sub>=' + customRound(schemaObj.resistance[rowId].x0) + ' мОм';
        }
    }
    html += '</span>';
    if (insert === false) {
        let id = document.getElementById(schemaObj.elements[rowId].key + 'Resistance' + rowId);
        id.innerHTML = html;
    } else {
        return html;
    }
}

function convertingData(data) {
    let result = data.replace(',', '.');
    result = result.replace(/[^0-9.]?/g, '');
    result = result.replace(/^([^\.]*\.)|\./g, '$1');
    return result;
}

function isEmptyObject(obj) { //0-если пустой
    let counter = 0;
    for (let key in obj) {
        counter++;
    }
    return counter;
}

function customModal(text) { //(text,[primary,info,warning,success,danger])
    let modal = document.getElementById('modal');
    modal.style.display = 'none';
    let span = document.getElementById('modal-close');
    let content = document.getElementById('modal-content');
    let body = document.getElementById('modal-body');
    modal.style.display = 'block';
    modal.classList.add('in');
    body.innerHTML = text;
    span.onclick = function () {
        modal.classList.remove('in');
        modal.style.display = 'none';
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            modal.classList.remove('in');
        }
    }
}

function tokKz() {
    let countPointKz = isEmptyObject(schemaObj.kzId);
    let string = "";
    let x = 0;
    let r = 0;
    let error = [];
    if (isEmptyObject(schemaObj.resistance) === 0) {
        customModal(textAddEl);
    } else {
        if (countPointKz == 0) {
            customModal(textAddPointKz);
        } else {
            let calc = {};
            for (let kzIdkey in schemaObj.kzId) {
                let result = {};
                result.r = 0;
                result.x = 0;
                result.r0 = 0;
                result.x0 = 0;
                result.ik3max = 0;
                result.ik3min = 0;
                result.ik2 = 0;
                result.ik1 = 0;
                for (let rowId in schemaObj.resistance) {
                    result.r += schemaObj.resistance[rowId].r;
                    result.x += schemaObj.resistance[rowId].x;
                    result.r0 += schemaObj.resistance[rowId].r0;
                    result.x0 += schemaObj.resistance[rowId].x0;
                    if (schemaObj.resistance[rowId].r === null || schemaObj.resistance[rowId].x === null || !isFinite(schemaObj.resistance[rowId].r) || !isFinite(schemaObj.resistance[rowId].x) || (schemaObj.resistance[rowId].r == 0 && schemaObj.resistance[rowId].x == 0 && schemaObj.resistance[rowId].r0 == 0 && schemaObj.resistance[rowId].x0 == 0)) {
                        error.push(rowId);
                    }
                    if (kzIdkey == rowId) break;
                }
                result.ik3max = (schemaObj.defaultVar.unn * 1000) / (Math.sqrt(3) * Math.sqrt(Math.pow(result.x, 2) + Math.pow(result.r, 2)));
                result.ik3min = (schemaObj.defaultVar.unn * 1000) / (Math.sqrt(3) * Math.sqrt(Math.pow(result.x, 2) + Math.pow(result.r + schemaObj.defaultVar.arcResistance, 2)));
                result.iudmax = Math.sqrt(2) * result.ik3max * koefUd(result.r, result.x);
                result.iudmin = Math.sqrt(2) * result.ik3min * koefUd(result.r, result.x);
                result.ik2max = (schemaObj.defaultVar.unn * 1000) / (2 * Math.sqrt(Math.pow(result.x, 2) + Math.pow(result.r, 2)));
                result.ik2min = (schemaObj.defaultVar.unn * 1000) / (2 * Math.sqrt(Math.pow(result.x, 2) + Math.pow(result.r + schemaObj.defaultVar.arcResistance / 2, 2)));
                result.ik1max = (schemaObj.defaultVar.unn * 1000 * Math.sqrt(3)) / Math.sqrt(Math.pow((2 * result.x) + result.x0, 2) + Math.pow((2 * (result.r)) + (result.r0), 2));
                result.ik1min = (schemaObj.defaultVar.unn * 1000 * Math.sqrt(3)) / Math.sqrt(Math.pow((2 * result.x) + result.x0, 2) + Math.pow((2 * (result.r + schemaObj.defaultVar.arcResistance)) + (result.r0 + schemaObj.defaultVar.arcResistance), 2));
                calc[kzIdkey] = result;
            }
            schemaObj.calc = calc;
            if (typeof schemaObj.calc === 'undefined' || isEmptyObject(schemaObj.calc) === 0) {
                customModal(textAddData);
            } else {
                if (error.length > 0) {
                    customModal("На участках " + error.join(', ') + " не определены сопротивления");
                } else {
                    string += "<h3>Результаты расчета токов КЗ</h3>";
                    string += "<table class=\"table table-bordered text-center\">";
                    string += "<thead class=\"text-center\"><tr>";
                    string += "<th rowspan='2'>Точка КЗ</th>";
                    string += "<th rowspan='2'>Вид КЗ</th>";
                    string += "<th colspan='2'>Максимальное значение тока КЗ, кА</th>";
                    string += "<th colspan='2'>Минимальное значение тока КЗ, кА</th>";
                    string += "</tr><tr>";
                    string += "<th>I<sub>к.max</sub></th>";
                    string += "<th>i<sub>уд.max</sub></th>";
                    string += "<th>I<sub>к.min</sub></th>";
                    string += "<th>i<sub>уд.min</sub></th>";
                    string += "</tr></thead><tbody>";
                    for (let pointKz in calc) {
                        string += "<tr>";
                        string += "<td rowspan='3'>Участок " + pointKz + "<br>Точка К" + pointKz + "</td>";
                        string += "<td>К<sup>(3)</sup></td>";
                        string += "<td>" + customRound(calc[pointKz].ik3max) + "</td>";
                        string += "<td>" + customRound(calc[pointKz].iudmax) + "</td>";
                        string += "<td>" + customRound(calc[pointKz].ik3min) + "</td>";
                        string += "<td>" + customRound(calc[pointKz].iudmin) + "</td>";
                        string += "</tr><tr>";
                        string += "<td>К<sup>(2)</sup></td>";
                        string += "<td>" + customRound(calc[pointKz].ik2max) + "</td>";
                        string += "<td>-</td>";
                        string += "<td>" + customRound(calc[pointKz].ik2min) + "</td>";
                        string += "<td>-</td>";
                        string += "</tr><tr>";
                        string += "<td>К<sup>(1)</sup></td>";
                        string += "<td>" + customRound(calc[pointKz].ik1max) + "</td>";
                        string += "<td>-</td>";
                        string += "<td>" + customRound(calc[pointKz].ik1min) + "</td>";
                        string += "<td>-</td>";
                        string += "</tr>";
                    }
                    string += "</tbody></table>";
                    result(string);
                }
            }
        }
    }
}

function reportEnergySystem(rowId) {
    let string = '';
    let xcvn = schemaObj.defaultVar.uvn / (Math.sqrt(3) * schemaObj.defaultVar.ikz);
    string += '<div class="area">';
    string += '<h5><strong>Индуктивное сопротивление системы на участке ' + rowId + ':</strong></h5>';
    string += '<table style="min-width: 330px;"><tr><td rowspan="2">X<sub>с.вн</sub>&nbsp;=&nbsp;</td><td style="text-align:center;">U<sub>вн</sub></td><td rowspan="2">&nbsp;=&nbsp;</td><td style="text-align:center;">' + schemaObj.defaultVar.uvn + '</td><td rowspan="2">&nbsp;=&nbsp;' + customRound(xcvn) + ' мОм;</td></tr><tr><td style="border-top: 1px solid #000;"> &radic;<span style="text-decoration:overline;">3</span> &times; I<sub>к.вн</sub><sup>(3)</sup></td><td style="border-top: 1px solid #000;"> &radic;<span style="text-decoration:overline;">3</span> &times; ' + schemaObj.defaultVar.ikz + '</td></tr></table>';
    string += 'I<sub>к.вн</sub><sup>(3)</sup> - <i>действующее значение периодической составляющей тока при трехфазном КЗ у выводов обмотки высшего напряжения трансформатора, кА</i><br><br>';
    string += '<i>Индуктивное сопротивление системы приведенное к низкой стороне:</i><br>';
    string += '<table style="min-width: 450px;"><tr><td rowspan="2">X<sub>с</sub>&nbsp;=&nbsp;10<sup>3</sup> &times; X<sub>с.вн</sub> &times;&nbsp;</td><td style="text-align:center;">U<sub>нн</sub><sup>2</sup></td><td rowspan="2">&nbsp;=&nbsp;1000 &times; ' + customRound(xcvn) + ' &times;&nbsp;</td><td style="text-align:center;">' + schemaObj.defaultVar.unn + '<sup>2</sup></td><td rowspan="2">&nbsp;=&nbsp;' + customRound(1000 * customRound(xcvn) * Math.pow((schemaObj.defaultVar.unn / schemaObj.defaultVar.uvn), 2)) + ' мОм.</td></tr><tr><td style="border-top: 1px solid #000;"> U<sub>вн</sub><sup>2</sup></td><td style="border-top: 1px solid #000;">' + schemaObj.defaultVar.uvn + '<sup>2</sup></td></tr></table>';
    string += '</div>';
    return string;
}

function reportTransformator(rowId, title) {
    let string = '';
    string += '<div class="area">';
    string += '<h5><strong>' + title + ' на участке ' + rowId + ':</strong></h5>';
    string += 'R<sub>т</sub> = ' + schemaObj.resistance[rowId].r + ' мОм;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    string += 'X<sub>т</sub> = ' + schemaObj.resistance[rowId].x + ' мОм;<br>';
    string += 'R<sub>0т</sub> = ' + schemaObj.resistance[rowId].r0 + ' мОм;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    string += 'X<sub>0т</sub> = ' + schemaObj.resistance[rowId].x0 + ' мОм.<br>';
    string += '</div>';
    return string;
}

function reportKabelVn(rowId, title) {
    let string = '';
    try {
        let kabVnVal = schemaObj.templates[rowId][0].valueItem;
        let kabVnLength = schemaObj.templates[rowId][1].valueItem;
        let kabVnQuantity = schemaObj.templates[rowId][2].valueItem;
        let kabVn = kabVnVal.split('|');
        string += '<div class="area">';
        string += '<h5><strong>' + title + ' на участке ' + rowId + ':</strong></h5>';
        string += '<table style="min-width: 330px;"><tr><td rowspan="2">R<sub>кб.вн</sub>&nbsp;=&nbsp;</td><td style="text-align:center;">R<sub>кб</sub> &times; l</td><td rowspan="2">&nbsp;=&nbsp;</td><td style="text-align:center;">' + kabVn[0] + ' &times; ' + kabVnLength + '</td><td rowspan="2">&nbsp;=&nbsp;' + customRound(kabVn[0] * kabVnLength / kabVnQuantity) + ' мОм;</td></tr><tr><td style="border-top: 1px solid #000;text-align:center;">n</td><td style="border-top: 1px solid #000;text-align:center;">' + kabVnQuantity + '</td></tr></table>';
        string += '<table style="min-width: 330px;"><tr><td rowspan="2">X<sub>кб.вн</sub>&nbsp;=&nbsp;</td><td style="text-align:center;">X<sub>кб</sub> &times; l</td><td rowspan="2">&nbsp;=&nbsp;</td><td style="text-align:center;">' + kabVn[1] + ' &times; ' + kabVnLength + '</td><td rowspan="2">&nbsp;=&nbsp;' + customRound(kabVn[1] * kabVnLength / kabVnQuantity) + ' мОм;</td></tr><tr><td style="border-top: 1px solid #000;text-align:center;">n</td><td style="border-top: 1px solid #000;text-align:center;">' + kabVnQuantity + '</td></tr></table>';
        string += '<table style="min-width: 330px;"><tr><td rowspan="2">R<sub>0кб.вн</sub>&nbsp;=&nbsp;</td><td style="text-align:center;">R<sub>0кб</sub> &times; l</td><td rowspan="2">&nbsp;=&nbsp;</td><td style="text-align:center;">' + kabVn[2] + ' &times; ' + kabVnLength + '</td><td rowspan="2">&nbsp;=&nbsp;' + customRound(kabVn[2] * kabVnLength / kabVnQuantity) + ' мОм;</td></tr><tr><td style="border-top: 1px solid #000;text-align:center;">n</td><td style="border-top: 1px solid #000;text-align:center;">' + kabVnQuantity + '</td></tr></table>';
        string += '<table style="min-width: 330px;"><tr><td rowspan="2">X<sub>0кб.вн</sub>&nbsp;=&nbsp;</td><td style="text-align:center;">X<sub>0кб</sub> &times; l</td><td rowspan="2">&nbsp;=&nbsp;</td><td style="text-align:center;">' + kabVn[3] + ' &times; ' + kabVnLength + '</td><td rowspan="2">&nbsp;=&nbsp;' + customRound(kabVn[3] * kabVnLength / kabVnQuantity) + ' мОм;</td></tr><tr><td style="border-top: 1px solid #000;text-align:center;">n</td><td style="border-top: 1px solid #000;text-align:center;">' + kabVnQuantity + '</td></tr></table>';
        string += 'l - <i>длина кабеля, м</i>;<br>';
        string += 'n - <i>количество параллельных ниток кабелей, шт</i>;<br>';
        string += '<i>Сопротивления приведенные к низкой стороне:</i><br>';
        string += '<table style="min-width: 370px;"><tr><td rowspan="2">R<sub>кб</sub>&nbsp;=&nbsp;R<sub>кб.вн</sub> &times;&nbsp;</td><td style="text-align:center;">U<sub>нн</sub><sup>2</sup></td><td rowspan="2">&nbsp;=&nbsp;' + customRound(kabVn[0] * kabVnLength / kabVnQuantity) + ' &times;&nbsp;</td><td style="text-align:center;">' + schemaObj.defaultVar.unn + '<sup>2</sup></td><td rowspan="2">&nbsp;=&nbsp;' + customRound(kabVn[0] * kabVnLength / kabVnQuantity * Math.pow((schemaObj.defaultVar.unn / schemaObj.defaultVar.uvn), 2)) + ' мОм;</td></tr><tr><td style="border-top: 1px solid #000;"> U<sub>вн</sub><sup>2</sup></td><td style="border-top: 1px solid #000;">' + schemaObj.defaultVar.uvn + '<sup>2</sup></td></tr></table>';
        string += '<table style="min-width: 370px;"><tr><td rowspan="2">X<sub>кб</sub>&nbsp;=&nbsp;X<sub>кб.вн</sub> &times;&nbsp;</td><td style="text-align:center;">U<sub>нн</sub><sup>2</sup></td><td rowspan="2">&nbsp;=&nbsp;' + customRound(kabVn[1] * kabVnLength / kabVnQuantity) + ' &times;&nbsp;</td><td style="text-align:center;">' + schemaObj.defaultVar.unn + '<sup>2</sup></td><td rowspan="2">&nbsp;=&nbsp;' + customRound(kabVn[1] * kabVnLength / kabVnQuantity * Math.pow((schemaObj.defaultVar.unn / schemaObj.defaultVar.uvn), 2)) + ' мОм;</td></tr><tr><td style="border-top: 1px solid #000;"> U<sub>вн</sub><sup>2</sup></td><td style="border-top: 1px solid #000;">' + schemaObj.defaultVar.uvn + '<sup>2</sup></td></tr></table>';
        string += '<table style="min-width: 370px;"><tr><td rowspan="2">R<sub>0кб</sub>&nbsp;=&nbsp;R<sub>0кб.вн</sub> &times;&nbsp;</td><td style="text-align:center;">U<sub>нн</sub><sup>2</sup></td><td rowspan="2">&nbsp;=&nbsp;' + customRound(kabVn[2] * kabVnLength / kabVnQuantity) + ' &times;&nbsp;</td><td style="text-align:center;">' + schemaObj.defaultVar.unn + '<sup>2</sup></td><td rowspan="2">&nbsp;=&nbsp;' + customRound(kabVn[2] * kabVnLength / kabVnQuantity * Math.pow((schemaObj.defaultVar.unn / schemaObj.defaultVar.uvn), 2)) + ' мОм;</td></tr><tr><td style="border-top: 1px solid #000;"> U<sub>вн</sub><sup>2</sup></td><td style="border-top: 1px solid #000;">' + schemaObj.defaultVar.uvn + '<sup>2</sup></td></tr></table>';
        string += '<table style="min-width: 370px;"><tr><td rowspan="2">X<sub>0кб</sub>&nbsp;=&nbsp;X<sub>0кб.вн</sub> &times;&nbsp;</td><td style="text-align:center;">U<sub>нн</sub><sup>2</sup></td><td rowspan="2">&nbsp;=&nbsp;' + customRound(kabVn[3] * kabVnLength / kabVnQuantity) + ' &times;&nbsp;</td><td style="text-align:center;">' + schemaObj.defaultVar.unn + '<sup>2</sup></td><td rowspan="2">&nbsp;=&nbsp;' + customRound(kabVn[3] * kabVnLength / kabVnQuantity * Math.pow((schemaObj.defaultVar.unn / schemaObj.defaultVar.uvn), 2)) + ' мОм.</td></tr><tr><td style="border-top: 1px solid #000;"> U<sub>вн</sub><sup>2</sup></td><td style="border-top: 1px solid #000;">' + schemaObj.defaultVar.uvn + '<sup>2</sup></td></tr></table>';
        string += '</div>';
        return string;
    } catch (err) {
    }
}

function reportKabelNn(rowId, title) {
    let string = '';
    try {
        let kabNnVal = schemaObj.templates[rowId][0].valueItem;
        let kabNnLength = schemaObj.templates[rowId][1].valueItem;
        let kabNnQuantity = schemaObj.templates[rowId][2].valueItem;
        let kabNn = kabNnVal.split('|');
        string += '<div class="area">';
        string += '<h5><strong>' + title + ' на участке ' + rowId + ':</strong></h5>';

        string += '<table style="min-width: 330px;"><tr><td rowspan="2">R<sub>кб</sub>&nbsp;=&nbsp;</td><td style="text-align:center;">R<sub>кб</sub> &times; l</td><td rowspan="2">&nbsp;=&nbsp;</td><td style="text-align:center;">' + kabNn[0] + ' &times; ' + kabNnLength + '</td><td rowspan="2">&nbsp;=&nbsp;' + customRound(kabNn[0] * kabNnLength / kabNnQuantity) + ' мОм;</td></tr><tr><td style="border-top: 1px solid #000;text-align:center;">n</td><td style="border-top: 1px solid #000;text-align:center;">' + kabNnQuantity + '</td></tr></table>';
        string += '<table style="min-width: 330px;"><tr><td rowspan="2">X<sub>кб</sub>&nbsp;=&nbsp;</td><td style="text-align:center;">X<sub>кб</sub> &times; l</td><td rowspan="2">&nbsp;=&nbsp;</td><td style="text-align:center;">' + kabNn[1] + ' &times; ' + kabNnLength + '</td><td rowspan="2">&nbsp;=&nbsp;' + customRound(kabNn[1] * kabNnLength / kabNnQuantity) + ' мОм;</td></tr><tr><td style="border-top: 1px solid #000;text-align:center;">n</td><td style="border-top: 1px solid #000;text-align:center;">' + kabNnQuantity + '</td></tr></table>';
        string += '<table style="min-width: 330px;"><tr><td rowspan="2">R<sub>0кб</sub>&nbsp;=&nbsp;</td><td style="text-align:center;">R<sub>0кб</sub> &times; l</td><td rowspan="2">&nbsp;=&nbsp;</td><td style="text-align:center;">' + kabNn[2] + ' &times; ' + kabNnLength + '</td><td rowspan="2">&nbsp;=&nbsp;' + customRound(kabNn[2] * kabNnLength / kabNnQuantity) + ' мОм;</td></tr><tr><td style="border-top: 1px solid #000;text-align:center;">n</td><td style="border-top: 1px solid #000;text-align:center;">' + kabNnQuantity + '</td></tr></table>';
        string += '<table style="min-width: 330px;"><tr><td rowspan="2">X<sub>0кб</sub>&nbsp;=&nbsp;</td><td style="text-align:center;">X<sub>0кб</sub> &times; l</td><td rowspan="2">&nbsp;=&nbsp;</td><td style="text-align:center;">' + kabNn[3] + ' &times; ' + kabNnLength + '</td><td rowspan="2">&nbsp;=&nbsp;' + customRound(kabNn[3] * kabNnLength / kabNnQuantity) + ' мОм;</td></tr><tr><td style="border-top: 1px solid #000;text-align:center;">n</td><td style="border-top: 1px solid #000;text-align:center;">' + kabNnQuantity + '</td></tr></table>';
        string += 'l - <i>длина кабеля, м</i>;<br>';
        string += 'n - <i>количество параллельных ниток кабелей, шт</i>.';
        string += '</div>';
        return string;
    } catch (err) {
    }
}

function reportShinoprovod(rowId, title) {
    let string = '';
    try {
        let shnpVal = schemaObj.templates[rowId][0].valueItem;
        let shnpLength = schemaObj.templates[rowId][1].valueItem;
        let shnp = shnpVal.split('|');
        string += '<div class="area">';
        string += '<h5><strong>' + title + ' на участке ' + rowId + ':</strong></h5>';
        string += 'R<sub>ш</sub> = R<sub>ш</sub> &times; l = ' + shnp[0] + ' &times; ' + shnpLength + ' = ' + customRound(shnp[0] * shnpLength) + ' мОм;<br>';
        string += 'X<sub>ш</sub> = X<sub>ш</sub> &times; l = ' + shnp[1] + ' &times; ' + shnpLength + ' = ' + customRound(shnp[1] * shnpLength) + ' мОм;<br>';
        string += 'R<sub>0ш</sub> = (R<sub>ш</sub> + 3&times;R<sub>нп</sub>) &times; l =  (' + shnp[0] + ' + 3 &times; ' + shnp[2] + ') &times; ' + shnpLength + ' = ' + customRound(+(shnp[0] * shnpLength) + (3 * shnp[2] * shnpLength)) + ' мОм;<br>';
        string += 'X<sub>0ш</sub> = (X<sub>ш</sub> + 3&times;X<sub>нп</sub>) &times; l =  (' + shnp[1] + ' + 3 &times; ' + shnp[3] + ') &times; ' + shnpLength + ' = ' + customRound(+(shnp[1] * shnpLength) + (3 * shnp[3] * shnpLength)) + ' мОм;<br>';
        string += 'l - <i>длина шинопровода, м</i>;<br>';
        string += 'R<sub>нп</sub>, X<sub>нп</sub> - <i>сопротивления нулевого проводника, мОм</i>.';
        string += '</div>';
        return string;
    } catch (err) {
    }
}

function reportHookup(rowId, title) { //контакты
    let string = '';
    try {
        let hookup = schemaObj.templates[rowId][0].valueItem;
        let hookupQuantity = schemaObj.templates[rowId][1].valueItem;
        let hookupValue = hookup.split('|');
        string += '<div class="area">';
        string += '<h5><strong>' + title + ' на участке ' + rowId + ':</strong></h5>';
        string += 'R<sub>к</sub> = R<sub>к</sub> &times; n = ' + hookupValue[0] + ' &times; ' + hookupQuantity + ' = ' + customRound(hookupValue[0] * hookupQuantity) + ' мОм;<br>';
        string += 'R<sub>0к</sub> = R<sub>0к</sub> &times; n = ' + hookupValue[2] + ' &times; ' + hookupQuantity + ' = ' + customRound(hookupValue[2] * hookupQuantity) + ' мОм;<br>';
        string += 'n - <i>количество, шт</i>.';
        string += '</div>';
        return string;
    } catch (err) {
    }
}

function reportTt(rowId, title) {
    let string = '';
    try {
        let tt = schemaObj.templates[rowId][0].valueItem;
        let ttQuantity = schemaObj.templates[rowId][1].valueItem;
        let ttValue = tt.split('|');
        string += '<div class="area">';
        string += '<h5><strong>' + title + ' на участке ' + rowId + ':</strong></h5>';
        string += 'R<sub>TA</sub> = R<sub>TA</sub> &times; n = ' + ttValue[0] + ' &times; ' + ttQuantity + ' = ' + customRound(ttValue[0] * ttQuantity) + ' мОм;<br>';
        string += 'X<sub>TA</sub> = X<sub>TA</sub> &times; n = ' + ttValue[1] + ' &times; ' + ttQuantity + ' = ' + customRound(ttValue[1] * ttQuantity) + ' мОм;<br>';
        string += 'R<sub>0TA</sub> = R<sub>0TA</sub> &times; n = ' + ttValue[2] + ' &times; ' + ttQuantity + ' = ' + customRound(ttValue[2] * ttQuantity) + ' мОм;<br>';
        string += 'X<sub>0TA</sub> = X<sub>0TA</sub> &times; n = ' + ttValue[3] + ' &times; ' + ttQuantity + ' = ' + customRound(ttValue[3] * ttQuantity) + ' мОм;<br>';
        string += 'n - <i>количество, шт</i>.';
        string += '</div>';
        return string;
    } catch (err) {
    }
}

function reportAvtomat(rowId, title) {
    let string = '';
    try {
        let avtomat = schemaObj.templates[rowId][0].valueItem;
        let avtomatQuantity = schemaObj.templates[rowId][1].valueItem;
        let avtomatValue = avtomat.split('|');
        string += '<div class="area">';
        string += '<h5><strong>' + title + ' на участке ' + rowId + ':</strong></h5>';
        string += 'R<sub>кв</sub> = R<sub>кв</sub> &times; n = ' + avtomatValue[0] + ' &times; ' + avtomatQuantity + ' = ' + customRound(avtomatValue[0] * avtomatQuantity) + ' мОм;<br>';
        string += 'X<sub>кв</sub> = X<sub>кв</sub> &times; n = ' + avtomatValue[1] + ' &times; ' + avtomatQuantity + ' = ' + customRound(avtomatValue[1] * avtomatQuantity) + ' мОм;<br>';
        string += 'R<sub>0кв</sub> = R<sub>0кв</sub> &times; n = ' + avtomatValue[2] + ' &times; ' + avtomatQuantity + ' = ' + customRound(avtomatValue[2] * avtomatQuantity) + ' мОм;<br>';
        string += 'X<sub>0кв</sub> = X<sub>0кв</sub> &times; n = ' + avtomatValue[3] + ' &times; ' + avtomatQuantity + ' = ' + customRound(avtomatValue[3] * avtomatQuantity) + ' мОм;<br>';
        string += 'n - <i>количество, шт</i>.';
        string += '</div>';
        return string;
    } catch (err) {
    }
}

function reportUnique(rowId, title) {
    let string = '';
    string += '<div class="area">';
    string += '<h5><strong>' + title + ' на участке ' + rowId + ':</strong></h5>';
    string += 'R = ' + schemaObj.templates[rowId][0].valueItem + ' мОм;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    string += 'X = ' + schemaObj.templates[rowId][1].valueItem + ' мОм;<br>';
    string += 'R<sub>0</sub> = ' + schemaObj.templates[rowId][2].valueItem + ' мОм;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    string += 'X<sub>0</sub> = ' + schemaObj.templates[rowId][3].valueItem + ' мОм.<br>';
    string += '</div>';
    return string;
}

function reportCalcKz() {
    let string = '';
    for (let kzIdkey in schemaObj.kzId) {
        string += '<div class="area">';
        string += '<div class="area-result"><h3>Расчет для КЗ на участке ' + kzIdkey + ':</h3>';
        string += '<h5><i>Суммарное сопротивление цепи</i>:</h5>';
        let i = 0;
        let formulaR = '';
        let formulaX = '';
        let formulaR0 = '';
        let formulaX0 = '';
        let valuesR = '';
        let valuesX = '';
        let valuesR0 = '';
        let valuesX0 = '';
        let R = 0;
        let X = 0;
        let R0 = 0;
        let X0 = 0;
        let pls = ' + ';
        for (let rowId in schemaObj.resistance) {
            if (schemaObj.resistance[rowId].r !== 0) {
                formulaR += 'R<sub>' + symbol[schemaObj.elements[rowId].key] + '</sub>' + pls;
                valuesR += customRound(schemaObj.resistance[rowId].r) + pls;
                R += schemaObj.resistance[rowId].r;
            }
            if (schemaObj.resistance[rowId].x !== 0) {
                formulaX += 'X<sub>' + symbol[schemaObj.elements[rowId].key] + '</sub>' + pls;
                valuesX += customRound(schemaObj.resistance[rowId].x) + pls;
                X += schemaObj.resistance[rowId].x;
            }
            if (schemaObj.resistance[rowId].r0 !== 0) {
                formulaR0 += 'R<sub>0' + symbol[schemaObj.elements[rowId].key] + '</sub>' + pls;
                valuesR0 += customRound(schemaObj.resistance[rowId].r0) + pls;
                R0 += schemaObj.resistance[rowId].r0;
            }
            if (schemaObj.resistance[rowId].x0 !== 0) {
                formulaX0 += 'X<sub>0' + symbol[schemaObj.elements[rowId].key] + '</sub>' + pls;
                valuesX0 += customRound(schemaObj.resistance[rowId].x0) + pls;
                X0 += schemaObj.resistance[rowId].x0;
            }
            if (kzIdkey == rowId) break;
            ++i;
        }
        string += 'R<sub>&sum;</sub> = ' + formulaR.replace(/\+ $/g, '') + ' = ' + valuesR.replace(/\+ $/g, '') + ' = ' + customRound(R) + ' мОм;<br>';
        string += 'X<sub>&sum;</sub> = ' + formulaX.replace(/\+ $/g, '') + ' = ' + valuesX.replace(/\+ $/g, '') + ' = ' + customRound(X) + ' мОм;<br>';
        string += 'R<sub>0&sum;</sub> = ' + formulaR0.replace(/\+ $/g, '') + ' = ' + valuesR0.replace(/\+ $/g, '') + ' = ' + customRound(R0) + ' мОм;<br>';
        string += 'X<sub>0&sum;</sub> = ' + formulaX0.replace(/\+ $/g, '') + ' = ' + valuesX0.replace(/\+ $/g, '') + ' = ' + customRound(X0) + ' мОм.<br>';
        let ik3max = customRound((schemaObj.defaultVar.unn * 1000) / (Math.sqrt(3) * Math.sqrt(Math.pow(X, 2) + Math.pow(R, 2))));
        let ik3min = customRound((schemaObj.defaultVar.unn * 1000) / (Math.sqrt(3) * Math.sqrt(Math.pow(X, 2) + Math.pow(R + schemaObj.defaultVar.arcResistance, 2))));
        let ikudmax = customRound(Math.sqrt(2) * ik3max * koefUd(R, X));
        let ikudmin = customRound(Math.sqrt(2) * ik3min * koefUd(R, X));
        let ik2max = customRound((schemaObj.defaultVar.unn * 1000) / (2 * Math.sqrt(Math.pow(X, 2) + Math.pow(R, 2))));
        let ik2min = customRound((schemaObj.defaultVar.unn * 1000) / (2 * Math.sqrt(Math.pow(X, 2) + Math.pow(R + schemaObj.defaultVar.arcResistance / 2, 2))));
        let ik1max = customRound((schemaObj.defaultVar.unn * 1000 * Math.sqrt(3)) / Math.sqrt(Math.pow((2 * X) + X0, 2) + Math.pow((2 * R) + R0, 2)));
        let ik1min = customRound((schemaObj.defaultVar.unn * 1000 * Math.sqrt(3)) / Math.sqrt(Math.pow((2 * X) + X0, 2) + Math.pow((2 * (R + schemaObj.defaultVar.arcResistance)) + (R0 + schemaObj.defaultVar.arcResistance), 2)));
        string += '<h5><i>Максимальное значение трехфазного тока КЗ</i>:</h5>';
        string += '<div class="table-responsive"><table style="min-width: 590px;"><tr><td rowspan="2">I<sub>к.max</sub><sup>(3)</sup>&nbsp;=&nbsp;</td><td style="text-align:center;">U<sub>нн</sub> &times; 10<sup>3</sup></td><td rowspan="2">&nbsp;=&nbsp;</td><td style="text-align:center;">' + schemaObj.defaultVar.unn + ' &times; 1000</td><td rowspan="2">&nbsp;=&nbsp;' + ik3max + ' кА;</td></tr><tr><td style="border-top: 1px solid #000;"> &radic;<span style="text-decoration:overline;">3</span> &times; &radic;<div style="border-top:1px solid #000;display:inline-block;margin-top:2px;">R<sub>&sum;</sub><sup>2</sup> + X<sub>&sum;</sub><sup>2</sup></div></td><td style="border-top: 1px solid #000;"> &radic;<span style="text-decoration:overline;">3</span> &times; &radic;<div style="border-top:1px solid #000;display:inline-block;margin-top:2px;">' + customRound(R) + '<sup>2</sup> + ' + customRound(X) + '<sup>2</sup></div></td></tr></table><br></div>';
        string += '<h5><i>Минимальное значение трехфазного тока КЗ (с учетом сопротивления дуги)</i>:</h5>';
        string += '<div class="table-responsive"><table style="min-width: 590px;"><tr><td rowspan="2">I<sub>к.min</sub><sup>(3)</sup>&nbsp;=&nbsp;</td><td style="text-align:center;">U<sub>нн</sub> &times; 10<sup>3</sup></td><td rowspan="2">&nbsp;=&nbsp;</td><td style="text-align:center;">' + schemaObj.defaultVar.unn + ' &times; 1000</td><td rowspan="2">&nbsp;=&nbsp;' + ik3min + ' кА;</td></tr><tr><td style="border-top: 1px solid #000;"> &radic;<span style="text-decoration:overline;">3</span> &times; &radic;<div style="border-top:1px solid #000;display:inline-block;margin-top:2px;">(R<sub>&sum;</sub> + R<sub>д</sub>)<sup>2</sup> + X<sub>&sum;</sub><sup>2</sup></div></td><td style="border-top: 1px solid #000;"> &radic;<span style="text-decoration:overline;">3</span> &times; &radic;<div style="border-top:1px solid #000;display:inline-block;margin-top:2px;">(' + customRound(R) + ' + ' + schemaObj.defaultVar.arcResistance + ')<sup>2</sup> + ' + customRound(X) + '<sup>2</sup></div></td></tr></table><br></div>';
        string += '<p>R<sub>д</sub> - <i>сопротивление дуги, мОм</i></p>';
        string += '<h5><i>Значение ударного тока КЗ</i>:</h5>';
        string += 'i<sub>уд.max</sub> = &radic;<span style="text-decoration:overline;">2</span> &times; I<sub>к.max</sub><sup>(3)</sup> &times; K<sub>уд</sub> = &radic;<span style="text-decoration:overline;">2</span> &times; ' + ik3max + ' &times; ' + koefUd(R, X) + ' = ' + ikudmax + ' кА;<br>';
        string += 'i<sub>уд.min</sub> = &radic;<span style="text-decoration:overline;">2</span> &times; I<sub>к.min</sub><sup>(3)</sup> &times; K<sub>уд</sub> = &radic;<span style="text-decoration:overline;">2</span> &times; ' + ik3min + ' &times; ' + koefUd(R, X) + ' = ' + ikudmin + ' кА;<br>';
        string += 'K<sub>уд</sub> - <i>Ударный коэффициент (см. кривые зависимости ударного коэффициента от отношений R/X и X/R).</i></p>';
        string += '<h5><i>Максимальное значение двухфазного тока КЗ</i>:</h5>';
        string += '<div class="table-responsive"><table style="min-width: 540px;"><tr><td rowspan="2">I<sub>к.max</sub><sup>(2)</sup>&nbsp;=&nbsp;</td><td style="text-align:center;">U<sub>нн</sub> &times; 10<sup>3</sup></td><td rowspan="2">&nbsp;=&nbsp;</td><td style="text-align:center;">' + schemaObj.defaultVar.unn + ' &times; 1000</td><td rowspan="2">&nbsp;=&nbsp;' + ik2max + ' кА;</td></tr><tr><td style="border-top: 1px solid #000;"> 2 &times; &radic;<div style="border-top:1px solid #000;display:inline-block;margin-top:2px;">R<sub>&sum;</sub><sup>2</sup> + X<sub>&sum;</sub><sup>2</sup></div></td><td style="border-top: 1px solid #000;"> 2 &times; &radic;<div style="border-top:1px solid #000;display:inline-block;margin-top:2px;">' + customRound(R) + '<sup>2</sup> + ' + customRound(X) + '<sup>2</sup></div></td></tr></table><br></div>';
        string += '<h5><i>Минимальное значение двухфазного тока КЗ (с учетом сопротивления дуги)</i>:</h5>';
        string += '<div class="table-responsive"><table style="min-width: 590px;"><tr><td rowspan="2">I<sub>к.min</sub><sup>(2)</sup>&nbsp;=&nbsp;</td><td style="text-align:center;">U<sub>нн</sub> &times; 10<sup>3</sup></td><td rowspan="2">&nbsp;=&nbsp;</td><td style="text-align:center;">' + schemaObj.defaultVar.unn + ' &times; 1000</td><td rowspan="2">&nbsp;=&nbsp;' + ik2min + ' кА;</td></tr><tr><td style="border-top: 1px solid #000;"> 2 &times; &radic;<div style="border-top:1px solid #000;display:inline-block;margin-top:2px;">(R<sub>&sum;</sub> + R<sub>д</sub>/2)<sup>2</sup> + X<sub>&sum;</sub><sup>2</sup></div></td><td style="border-top: 1px solid #000;"> 2 &times; &radic;<div style="border-top:1px solid #000;display:inline-block;margin-top:2px;">(' + customRound(R) + ' + ' + schemaObj.defaultVar.arcResistance + '/2)<sup>2</sup> + ' + customRound(X) + '<sup>2</sup></div></td></tr></table><br></div>';
        string += '<h5><i>Максимальное значение однофазного тока КЗ</i>:</h5>';
        string += '<div class="table-responsive"><table style="min-width:350px;"><tr><td rowspan="2">I<sub>к.max</sub><sup>(1)</sup>&nbsp;=&nbsp;</td><td style="text-align:center;">&radic;<span style="text-decoration:overline;">3</span> &times; U<sub>нн</sub> &times; 10<sup>3</sup></td><td rowspan="2"> ;</td></tr><tr><td style="border-top: 1px solid #000;">&radic;<div style="border-top:1px solid #000;display:inline-block;margin-top:2px;">(2&timesR<sub>&sum;</sub> + R<sub>0&sum;</sub>)<sup>2</sup> + (2&timesX<sub>&sum;</sub> + X<sub>0&sum;</sub>)<sup>2</sup></div></td></tr></table><br></div>';
        string += '<div class="table-responsive"><table style="min-width: 550px;"><tr><td rowspan="2">I<sub>к.max</sub><sup>(1)</sup>&nbsp;=&nbsp;</td><td style="text-align:center;">&radic;<span style="text-decoration:overline;">3</span> &times; ' + schemaObj.defaultVar.unn + ' &times; 1000</td><td rowspan="2"> = ' + ik1max + ' кА.</td></tr><tr><td style="border-top: 1px solid #000;">&radic;<div style="border-top:1px solid #000;display:inline-block;margin-top:2px;">(2&times' + customRound(R) + ' + ' + customRound(R0) + ')<sup>2</sup> + (2&times' + customRound(X) + ' + ' + customRound(X0) + ')<sup>2</sup></div></td></tr></table></div>';
        string += '<h5><i>Минимальное значение однофазного тока КЗ (с учетом сопротивления дуги)</i>:</h5>';
        string += '<div class="table-responsive"><table style="min-width:400px;"><tr><td rowspan="2">I<sub>к.min</sub><sup>(1)</sup>&nbsp;=&nbsp;</td><td style="text-align:center;">&radic;<span style="text-decoration:overline;">3</span> &times; U<sub>нн</sub> &times; 10<sup>3</sup></td><td rowspan="2"> ;</td></tr><tr><td style="border-top: 1px solid #000;">&radic;<div style="border-top:1px solid #000;display:inline-block;margin-top:2px;">(2&times(R<sub>&sum;</sub> + R<sub>д</sub>) + R<sub>0&sum;</sub> + R<sub>д</sub>)<sup>2</sup> + (2&timesX<sub>&sum;</sub> + X<sub>0&sum;</sub>)<sup>2</sup></div></td></tr></table><br></div>';
        string += '<div class="table-responsive"><table style="min-width: 590px;"><tr><td rowspan="2">I<sub>к.min</sub><sup>(1)</sup>&nbsp;=&nbsp;</td><td style="text-align:center;">&radic;<span style="text-decoration:overline;">3</span> &times; ' + schemaObj.defaultVar.unn + ' &times; 1000</td><td rowspan="2"> = ' + ik1min + ' кА.</td></tr><tr><td style="border-top: 1px solid #000;">&radic;<div style="border-top:1px solid #000;display:inline-block;margin-top:2px;">(2&times(' + customRound(R) + ' + ' + schemaObj.defaultVar.arcResistance + ') + ' + customRound(R0) + ' + ' + schemaObj.defaultVar.arcResistance + ')<sup>2</sup> + (2&times' + customRound(X) + ' + ' + customRound(X0) + ')<sup>2</sup></div></td></tr></table></div>';
        string += '</div></div>';
    }
    return string;
}

function reportSchema() {
    let string = '';
    for (let rowId in schemaObj.elements) {
        let title = '';
        if (schemaObj.elements[rowId].title !== null) {
            title = schemaObj.elements[rowId].title;
        } else {
            title = schemaObj.elements[rowId].name;
        }
        if (schemaObj.templates[rowId][0].textItem !== null) {
            title += '<br>' + schemaObj.templates[rowId][0].textItem;
        }
        string += '<div class="row">';
        string += '<div class="col-xs-6">';
        string += '<div class="reportTitle"><span><strong> ' + rowId + ') </strong></span><span> ' + title + ' </span></div>';
        string += '</div>';
        string += '<div class="col-xs-6">';
        let img;
        if (schemaObj.elements[rowId].key == 'energySystem') {
            img = reportSysSvg;
        } else if (schemaObj.elements[rowId].key == 'hookup') {
            img = reportRSvg;
        } else {
            img = reportRxSvg;
        }
        let pointKz = '';
        let pointKzImg = '';
        if (schemaObj.elements[rowId].pointKz !== null) {
            pointKz = ' pointKz';
            pointKzImg = '<span>К'+ rowId +'</span> '+ pointKzSvg;
        }
        string += '<div class="' + schemaObj.elements[rowId].key + 'Img' + pointKz + '">';
        string += '   <div class="resistanceData">' + addResistance(rowId, true) + '</div>';
        string += '   <div id="pointKzWrapper' + rowId + '" class="pointKzWrapper">'+ pointKzImg +'</div>';
        string += img;
        string += '</div>';
        string += '</div>';
        string += '</div>';
    }
    string += '<div class="row">';
    string += '<div class="col-xs-12 img-responsive">';
    string += '<br><br><h4>Кривые зависимости ударного коэффициента от отношений R/X и X/R</h4>';
    string += koefRXSvg;
    string += '</div>';
    string += '<div class="col-xs-12 img-responsive"><br>';
    string += koefXRSvg;
    string += '</div>';
    string += '</div>';
    return string;
}

function report() {
    //schemaObj = JSON.parse(saveObject); //////////////////////////////////////////////////////// DELETE
    //console.log(JSON.stringify(schemaObj))
    let error = [];
    let string = '';
    if (isEmptyObject(schemaObj.elements) !== 0) {
        string += '<div class="row">';
        string += '<h3>Расчет токов КЗ 0,4кВ (ГОСТ 28249-93)</h3><br>';
        string += '<div class="col-md-5">';
        string += reportSchema();
        string += '</div>';
        string += '<div class="col-md-7">';
        string += '<div class="area">R - <i>активное сопротивление прямой последовательности;</i><br>X - <i>индуктивное сопротивление прямой последовательности;</i><br>R<sub>0</sub> - <i>активное сопротивление обратной последовательности;</i><br>X<sub>0</sub> - <i>индуктивное сопротивление обратной последовательности;</i></div>';
        for (rowId in schemaObj.elements) {
            let title = '';
            if (schemaObj.elements[rowId].title !== null) {
                title = schemaObj.elements[rowId].title;
            } else {
                title = schemaObj.elements[rowId].name;
            }
            if (schemaObj.elements[rowId].key == 'energySystem') {
                string += reportEnergySystem(rowId);
            } else if (schemaObj.elements[rowId].key == 'transformator') {
                string += reportTransformator(rowId, title);
            } else if (schemaObj.elements[rowId].key == 'kabelVn') {
                string += reportKabelVn(rowId, title);
            } else if (schemaObj.elements[rowId].key == 'kabelNn') {
                string += reportKabelNn(rowId, title);
            } else if (schemaObj.elements[rowId].key == 'shinoprovod') {
                string += reportShinoprovod(rowId, title);
            } else if (schemaObj.elements[rowId].key == 'hookup') { //контакты
                string += reportHookup(rowId, title);
            } else if (schemaObj.elements[rowId].key == 'tt') {
                string += reportTt(rowId, title);
            } else if (schemaObj.elements[rowId].key == 'avtomat') {
                string += reportAvtomat(rowId, title);
            } else if (schemaObj.elements[rowId].key == 'unique') {
                string += reportUnique(rowId, title);
            }
            if (schemaObj.resistance[rowId].r === null || schemaObj.resistance[rowId].x === null || !isFinite(schemaObj.resistance[rowId].r) || !isFinite(schemaObj.resistance[rowId].x) || (schemaObj.resistance[rowId].r == 0 && schemaObj.resistance[rowId].x == 0 && schemaObj.resistance[rowId].r0 == 0 && schemaObj.resistance[rowId].x0 == 0)) {
                error.push(rowId);
            }
        }
        string += reportCalcKz();
        string += '</div>';
        string += '</div>';
        if (isEmptyObject(schemaObj.kzId) === 0) {
            customModal(textAddPointKz);
        } else {
            if (error.length > 0) {
                customModal("На участках " + error.join(', ') + " не определены сопротивления");

            } else {
                result(string);
            }
        }
    } else {
        customModal(textAddEl);
    }
}

function koefUd(r, x) {
    let rx = r / x;
    let xr = x / r;
    let koef, krx, kxr;
    for (let rxKey in koefUdRX) {
        let koefRX = koefUdRX[rxKey];
        rxKey = +rxKey;
        krx = koefRX;
        if (rxKey > rx) {
            break;
        }
    }
    for (let xrKey in koefUdXR) {
        let koefXR = koefUdXR[xrKey];
        xrKey = +xrKey;
        kxr = koefXR;
        if (xrKey > xr) {
            break;
        }
    }
    koef = Math.max(krx, kxr);
    return koef;
}

function result(data) {
    let string = '';
    let resultBlock = document.getElementById('projectResult');
    let setBlock = document.getElementById('projectSet');
    string += '<button type="button" id="report-close" class="close hidden-print"><span>&times;</span></button>';
    string += '<div class="container">';
    string += data;
    string += '</div>';
    string += '</div>';
    setBlock.style.display = 'none';
    resultBlock.innerHTML = string;
    window.scrollTo(0, 0);
    let close = document.getElementById("report-close");
    close.onclick = function () {
        resultBlock.innerHTML = '';
        setBlock.style.display = 'block';
    }
}

function saveLocalScheme() {
    let html = '';
    let name = '';
    let data;
    html += '<div class="form-group"><label><i>Введите название проекта</i></label>';
    html += '<input name="projectName" class="form-control" id="projectName" type="text" value="">';
    html += '</div>';
    html += '<span id="saveProject" class="btn btn-success">Сохранить</span>';
    customModal(html);
    let elName = document.getElementById("projectName");
    let elSave = document.getElementById("saveProject");
    name = projectName.addEventListener("change", function () {
        name = elName.value;
        return name;
    });

    elSave.addEventListener("click", function () {
        try {
            let projectsId = localStorage.getItem('projectsId');
            if (projectsId === null) {
                projectsId = [];
            }
            else {
                projectsId = JSON.parse(projectsId);
            }
            if (name === undefined) {
                name = 'Проект ';
            } else {
                name = name.replace(/[\\\|\'\"\#^\:\;\\$\%\&\?\/]/g, '');
            }
            let date = getDate();
            let id = date.replace(/[.: ]/g, '');
            let str = id + '|' + name + '|' + date;
            let max = 3;
            if (projectsId.length > max) {
                let del = projectsId.shift();
                let delId = del.split('|');
                localStorage.removeItem(delId[0]);
            }
            projectsId.push(str);
            localStorage.setItem(id, JSON.stringify(schemaObj));
            localStorage.setItem('projectsId', JSON.stringify(projectsId));
            customModal(textProjectSaved);
        } catch (err) {
            customModal(textLocalError);
        }
    });
}

function loadLocalScheme() {
    let html = '';
    let projectsId;
    try {
        projectsId = localStorage.getItem('projectsId');
        let id;
        if (projectsId == null) {
            customModal(textDontHaveSavProject);
        } else {
            projectsId = JSON.parse(projectsId);

            html = '<div class="form-group"><label><i>Выберите проект</i></label>';
            html += '<select id="projectSelect" class="form-control" name="projectSelect">';
            html += " <option value=''>--- Сделайте выбор ---</option>";
            for (let i = 0; i < projectsId.length; i++) {
                let projectsIdArray = projectsId[i].split('|');
                html += "<option value='" + projectsIdArray[0] + "'>" + projectsIdArray[1] + "  -  " + projectsIdArray[2] + "</option>";
            }
            html += '</select>';
            html += '</div>';
            html += '<span id="loadProject" class="btn btn-success">Загрузить</span>';
            customModal(html);
            let elSelect = document.getElementById("projectSelect");
            let elLoad = document.getElementById("loadProject");
            id = elSelect.addEventListener("change", function () {
                id = elSelect.value;
                return id;
            });
            elLoad.addEventListener("click", function () {
                let projectId = localStorage.getItem(id);
                if (projectId !== null) {
                    console.log(projectId);
                    renderScheme(projectId);
                }
            });
        }
    } catch (err) {
        customModal(textLocalError);
    }
}

function saveFileScheme() {
    let html = '';
    let name = '';
    let data;
    html += '<div class="form-group"><label><i>Введите название проекта</i></label>';
    html += '<input name="projectName" class="form-control" id="projectName" type="text" value="">';
    html += '</div>';
    html += '<a href="javascript:void(0)" id="saveProject" class="btn btn-success">Сохранить</a>';
    customModal(html);
    let elName = document.getElementById("projectName");
    let elSave = document.getElementById("saveProject");
    name = projectName.addEventListener("change", function () {
        name = elName.value;
        return name;
    });

    elSave.addEventListener("click", function () {
        try {
            let project = JSON.stringify(schemaObj);
            if (name === undefined) {
                name = 'Проект ';
            } else {
                name = name.replace(/[\\\|\'\"\#^\:\;\\$\%\&\?\/]/g, '');
            }
            let type = 'text/plain';
            let date = getDate();
            let id = date.replace(/[: ]/g, '_');
            name = name + id + '.txt';
            let file = new Blob([project], {type: type});
            elSave.href = URL.createObjectURL(file);
            elSave.download = name;
            customModal(textProjectSendSaved);
        } catch (err) {
            customModal(textSaveFileError);
        }
    });
} 

function loadFileScheme() {
    let html = '';
    html += '<div class="form-group">';
    html += '<label for="loadFile">Выберите файл проекта</label>';
    html += '<input type="file" id="loadFile" name="loadFile" />';
    html += '<div id="importDataBlock"></div>';
    html += '<div id="dataFileBlock"></div>';
    html += '</div>';
    customModal(html);
    let loadFileId = document.getElementById('loadFile');
    let dataFileBlock = document.getElementById('dataFileBlock');
    loadFileId.addEventListener('change', function (evt) {
        let files = evt.target.files;
        let file = files[0];           
        let reader = new FileReader();    
        reader.onload = function(theFile) {
            dataFileBlock.innerHTML = theFile.target.result;
            document.getElementById('importDataBlock').innerHTML = '<span id="importData" class="btn btn-primary mt1" onclick="importDataInFile()">Импортировать проект</span>';
        }
        reader.readAsText(file);
    }); 
}

function importDataInFile() {
        let dataFileBlock = document.getElementById('dataFileBlock').innerHTML;
        let data = JSON.parse(dataFileBlock);
        //schemaObj = data;
        renderScheme(JSON.stringify(data));
console.log(data);  
}

function renderScheme(loadedObject) {
    let tbody = document.getElementById('dynamic');
    let arcSelectVar = document.getElementById("arcSelect");
    let arcInputVar = document.getElementById("arcInput");
    let html = '';
    if (loadedObject !== null) {
        schemaObj = JSON.parse(loadedObject);
        arcInputVar.value = schemaObj.defaultVar.arcResistance;
        arcSelectVar.innerHTML = addOption(arcArray, schemaObj.defaultVar.arcResistance);
        for (rowId in schemaObj.elements) {
            let title;
            if (schemaObj.elements[rowId].title !== null) {
                title = schemaObj.elements[rowId].title;
            } else {
                title = schemaObj.elements[rowId].name;
            }
            html += "<tr id=\"row" + rowId + "\">";
            html += "   <td id=\"elementSelect" + rowId + "\">";
            html += "       <div class=\"form-inline\">";
            html += "           <div class=\"form-group\"><label>" + rowId + "</label>&nbsp;";
            html += "               <input id=\"elementSelectVal" + rowId + "\" class=\"form-control select\" type=\"text\" name=\"elementSelectVal[" + rowId + "]\" onchange=\"changeElementTitleValue(this.id," + rowId + ")\" value=\"" + title + "\">";
            html += "           </div>";
            html += "       </div>";
            html += "   </td>";
            html += "   <td id=\"elementScheme" + rowId + "\" class=\"elementScheme\">" + renderItemScheme(schemaObj.elements[rowId].key, rowId, addResistance(rowId, true)) + "</td>";
            html += "   <td id=\"elementData" + rowId + "\" class=\"elementData\">" + htmlDecode(renderTemplateItemData(schemaObj.elements[rowId].key, rowId, true)) + "</td>";
            html += "   <td id=\"pointKz" + rowId + "\" class=\"elementPointKz\">" + renderItemPointKz(schemaObj.elements[rowId].key, rowId, schemaObj.elements[rowId].pointKz) + "</td>";
            html += "   <td><input type=\"button\" value=\"Удалить\" class=\"delete btn btn-danger\" onclick=\"deleteRow(" + rowId + ")\"></td>";
            html += "</tr>";

        }
        html += "<tr class=\"table-row\"><td class=\"selector\"><select id=\"elementSelect\" class=\"form-control\" name=\"elementSelect\">";
        html += addElementsSelect();
        html += "</select></td><td class=\"elementScheme\"></td><td class=\"elementData\"></td><td class=\"elementPointKz\"></td><td class=\"rowAddDel\"><input type=\"button\" class=\"add btn btn-success\" onclick=\"addRow(schemaObj);\" value=\"Добавить\"></td></tr>";
    }
    tbody.innerHTML = html;
}

function customRound(num) {
    let res = +parseFloat(num).toFixed(3);
    return res;
}

function getDate() {
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1; //January is 0!
    let yyyy = date.getFullYear();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ms = date.getMilliseconds();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    let today = dd + '.' + mm + '.' + yyyy + ' ' + h + ':' + m + ':' + s;
    let key = dd + mm + yyyy + h + m + s + ms;
    return today;
}


function print(quality = 1) {
    const filename = 'ThisIsYourPDFFilename.pdf';

    html2canvas(document.querySelector('#projectResult'),
        {scale: quality}
    ).then(canvas => {
        let pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
        pdf.save(filename);
    });
}

function htmlDecode(str) {
    let result = str.replace(/&gt;/g, '>');
    result = result.replace(/&lt;/g, '<');
    //result = result.replace(/&quot;/g, '"');
    //result = result.replace(/&apos;/g, "'");
    //result = result.replace(/&amp;/g, '&');
    return result;
};

function htmlEncode(str) {
    let result = str.replace(/>/g, '&gt;');
    result = result.replace(/</g, '&lt;');
    //result = result.replace(/"/g, '&quot;');
    //result = result.replace(/'/g, "&apos;");
    //result = result.replace(/&/g, '&amp;');
    return result;
};
