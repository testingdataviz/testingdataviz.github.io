<!DOCTYPE html>
<html lang="en" xmlns:v-bind="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta charset="utf-8">
    <title>Virtual Art Decoder</title>

    <!--Adding Bootstrap for styling-->
    <link rel="stylesheet" href="https://bootswatch.com/4/flatly/bootstrap.min.css">
    <link rel="stylesheet" href="css/custom.css">
    <link rel="stylesheet" href="css/othercustomm.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.3.0/ekko-lightbox.css">


</head>

<body >
<div id="app">

<div class="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
    <div class="container">
        <a href="../" class="navbar-brand">Virtual Art Decoder v0.4</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">

            <ul class="nav navbar-nav ml-auto">

                    <input class="form-control mr-sm-2" type="text" v-model="search" placeholder="Write something to search" aria-label="Search">

            </ul>

        </div>
    </div>
</div>


<div class="container-fluid pl-5 pr-5" >



    <div v-for="(result, index) in filteredResults" v-cloak >
        <!--Header = Microsoft Azure Caption-->
        <div class="card border-secondary mt-1" style="width: 100%;">
            <div class="card-header">
                <div v-if="result.microsoftazure.main.description.captions" style="display:flex; align-items: baseline;">
                    <h4 class="mr-2 text-muted" > #{{ index+1 }} </h4>
                    <h4 class="card-title">{{result.microsoftazure.main.description.captions[0].text}}</h4>
                    <span class="badge badge-info ml-2">{{result.microsoftazure.main.description.captions[0].confidence | toPercentage}}</span>
                </div>
                <div v-else>
                    <h4 class="mr-2 text-muted" > #{{ index+1 }} </h4>

                </div>
            </div>

            <!--Body: Results from ML Algos-->
            <div class="card-body">


                    <div class="row">
                        <!--Here goes the image-->
                        <div class="col">
                            <p class="card-text">
                                <a v-bind:href="result.linkImage" data-toggle="lightbox">
                                    <img id="whatever" class="img-fluid" v-bind:src="result.linkImage" width="500"/>
                                </a>
                            </p>
                        </div>

                        <!--This div contains the results-->
                        <div class="col-9">

                            <!--NAVS for the tabs-->
                            <nav>
                                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                    <a class="nav-item nav-link active" data-toggle="tab" v-bind:href="'#nav-google' + index" role="tab" aria-controls="nav-google" aria-selected="true">Google Cloud Vision</a>
                                    <a class="nav-item nav-link"  data-toggle="tab" v-bind:href="'#nav-microsoft' + index" role="tab" aria-controls="nav-microsoft" aria-selected="false">Microsoft Azure</a>
                                    <a class="nav-item nav-link"  data-toggle="tab" v-bind:href="'#nav-amazon' + index" role="tab" aria-controls="nav-amazon" aria-selected="false">Amazon Rekognition</a>
                                    <a class="nav-item nav-link" data-toggle="tab" v-bind:href="'#nav-ibm' + index" role="tab" aria-controls="nav-ibm" aria-selected="false">IBM Watson</a>
                                </div>
                            </nav>


                            <div class="tab-content" id="nav-tabContent">

                                <!--GOOGLE RESULTS-->
                                <div class="tab-pane fade show active" :id="'nav-google' + index" role="tabpanel" aria-labelledby="nav-google-tab">

                                <!--This is Google labelAnnotations result-->
                                    <div class="row">
                                        <div class="col-md-auto">
                                            <h5 class="text-muted"> Label Annotations: </h5>
                                        </div>

                                        <div class="col-md-auto"  v-for="(categ, categind) in result.googlecloud.labelAnnotations">
                                            <div style="display:flex; align-items: baseline;">
                                                <h5 > {{categ.description}}</h5>
                                                <span class="badge badge-info ml-2">{{categ.score | toPercentage}}</span>
                                            </div>

                                        </div>
                                    </div>

                                    <!--This is Google safeSearch Annotation-->
                                    <div class="row">
                                        <div class="col-md-auto">
                                            <h5 class="text-muted"> Safe Search Annotations: </h5>
                                        </div>

                                        <div class="col-md-auto">
                                            <div style="display:flex; align-items: baseline;">
                                                <h5 class="text-warning pr-2">Adult: </h5>
                                                <h5 > {{result.googlecloud.safeSearchAnnotation.adult}}</h5>
                                            </div>
                                        </div>
                                        <div class="col-md-auto">
                                            <div style="display:flex; align-items: baseline;">
                                                <h5 class="text-warning pr-2">Medical: </h5>
                                                <h5 > {{result.googlecloud.safeSearchAnnotation.medical}}</h5>
                                            </div>
                                        </div>
                                        <div class="col-md-auto">
                                            <div style="display:flex; align-items: baseline;">
                                                <h5 class="text-warning pr-2">Racy: </h5>
                                                <h5 > {{result.googlecloud.safeSearchAnnotation.racy}}</h5>
                                            </div>
                                        </div>
                                        <div class="col-md-auto">
                                            <div style="display:flex; align-items: baseline;">
                                                <h5 class="text-warning pr-2">Spoof: </h5>
                                                <h5 > {{result.googlecloud.safeSearchAnnotation.spoof}}</h5>
                                            </div>
                                        </div>
                                        <div class="col-md-auto">
                                            <div style="display:flex; align-items: baseline;">
                                                <h5 class="text-warning pr-2">Violence: </h5>
                                                <h5 > {{result.googlecloud.safeSearchAnnotation.violence}}</h5>
                                            </div>
                                        </div>

                                </div>This

                                    <!--This is Google Web Detection Results-->
                                    <!--Best Guess Label-->
                                    <div class="row">

                                        <div class="col-md-auto" style="display:flex; align-items: baseline;">
                                            <h5 class="text-muted pr-2">Best Guess: </h5>
                                            <h5 > <strong>{{result.googlecloud.webDetection.bestGuessLabels[0].label}}</strong> </h5>
                                        </div>
                                    </div>

                                    <!--Visually Similar Images-->
                                    <div class="row">
                                    <h5 class="text-muted pr-2 col-md-auto">Visually Similar: </h5>
                                        <div class="col-md-auto"  v-for="(categ, categind) in result.googlecloud.webDetection.visuallySimilarImages">
                                            <div style="display:flex; align-items: baseline;">
                                                <a v-bind:href="categ.url" data-toggle="lightbox">
                                                    <img v-bind:src="categ.url" height="50">
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <!--Web Entities-->
                                    <div class="row pt-2">
                                        <div class="col-md-auto">
                                            <h5 class="text-muted"> Associated Web Entities: </h5>
                                        </div>

                                        <div class="col-md-auto"  v-for="(categ, categind) in result.googlecloud.webDetection.webEntities">
                                            <div style="display:flex; align-items: baseline;">
                                                <h5 > {{categ.description}}</h5>
                                                <span class="badge badge-success ml-2">{{categ.score | substringNumber('3')}}</span>
                                            </div>

                                        </div>
                                    </div>

                                    <!--Text Annotation-->
                                    <div class="row" v-if="result.googlecloud.fullTextAnnotation">
                                        <div class="col-md-auto" style="display:flex; align-items: baseline;">
                                            <h5 class="text-muted pr-2">Text: </h5>
                                            <h5 > <strong>  {{result.googlecloud.fullTextAnnotation.text}} </strong>  </h5>
                                            <span class="badge badge-light ml-2">{{result.googlecloud.fullTextAnnotation.pages[0].property.detectedLanguages[0].languageCode }}</span>
                                        </div>
                                    </div>

                                    <!--Color Google TBC-->
<!--
                                    <div class="row">
                                        <div class="col-md-a</strong>uto">
                                            <div class="col-md-auto"  v-for="(colors, colorind) in result.googlecloud.imagePropertiesAnnotation.dominantColors.colors">
                                               <p>{{colors.color.red}}</p>
                                                <div class="col-md-auto">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
-->

                                </div>

                                <!--MICROSOFT RESULTS-->
                                <div class="tab-pane fade" :id="'nav-microsoft' + index" role="tabpanel" aria-labelledby="nav-microsoft-tab">

                                    <!--This row displays Microsoft Adult Content Result-->
                                    <div class="row">
                                        <div class="col-md-auto">
                                            <div style="display:flex; align-items: baseline;">
                                                <h5>Is Adult Content?</h5>
                                                <h5 class="text-warning ml-2"> {{result.microsoftazure.main.adult.isAdultContent}} </h5>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="progress" style="height: 22px">
                                                <div class="progress-bar" role="progressbar"  v-bind:style="{'width': result.microsoftazure.main.adult.adultScore * 100 + '%'}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> {{ result.microsoftazure.main.adult.adultScore | toPercentage}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--This row displays Microsoft Racy Content Result-->
                                    <div class="row">
                                        <div class="col-md-auto">
                                            <div style="display:flex; align-items: baseline;">
                                                <h5>Is Racy Content?</h5>
                                                <h5 class="text-warning ml-2"> {{result.microsoftazure.main.adult.isRacyContent}} </h5>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="progress" style="height: 22px">
                                                <div class="progress-bar" role="progressbar"  v-bind:style="{'width': result.microsoftazure.main.adult.adultScore * 100 + '%'}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> {{ result.microsoftazure.main.adult.racyScore | toPercentage}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--This row shows Microsoft color results-->
                                    <div class="row">
                                        <div class="col-md-auto" >
                                            <h5 >Is Black and White? <span class="text-warning"> {{result.microsoftazure.main.color.isBwImg }}</span> </h5>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-auto" >
                                            <div style="display:flex; align-items: baseline;">
                                            <h5>Dominant Colors:</h5>
                                            <div v-for="color in result.microsoftazure.main.color.dominantColors">
                                                <h5 class="pr-2" v-bind:style="{'background-color' : color}">{{color}}</h5>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-auto">
                                            <h5>Accent Color:</h5>
                                            <div  style="width:100px;height:20px;border:1px solid #000;" v-bind:style="{'background-color' : '#' + result.microsoftazure.main.color.accentColor}"></div>
                                        </div>
                                    </div>
                                    <!--This row shows Microsoft Categories-->
                                    <div class="row">
                                        <div class="col-md-auto">
                                            <h5 class="text-muted"> Categories: </h5>
                                        </div>

                                        <div class="col-md-auto"  v-for="(categ, categind) in result.microsoftazure.main.categories">
                                            <div style="display:flex; align-items: baseline;">
                                                <h5 > {{categ.name}}</h5>
                                                <span class="badge badge-info ml-2">{{categ.score | toPercentage}}</span>
                                            </div>

                                        </div>
                                    </div>
                                    <!--This row shows Microsoft Tags-->
                                    <div class="row">
                                        <div class="col-md-auto">
                                            <h5 class="text-muted"> Tags (from caption): </h5>
                                        </div>

                                        <div class="col-md-auto"  v-for="(tag, tagind) in result.microsoftazure.main.description.tags">
                                            <div style="display:flex; align-items: baseline;">
                                                <h5 > {{tag}}</h5>
                                            </div>

                                        </div>
                                    </div>
                                    <!--This row shows Microsoft Categories-->
                                    <div class="row">
                                        <div class="col-md-auto">
                                            <h5 class="text-muted"> Tags (with confidence): </h5>
                                        </div>

                                        <div class="col-md-auto"  v-for="(categ, categind) in result.microsoftazure.main.tags">
                                            <div style="display:flex; align-items: baseline;">
                                                <h5 > {{categ.name}}</h5>
                                                <span class="badge badge-info ml-2">{{categ.confidence | toPercentage}}</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <!--AMAZON RESULTS-->
                                <div class="tab-pane fade" :id="'nav-amazon' + index" role="tabpanel" aria-labelledby="nav-amazon-tab">
                                    <!--This shows Amazon Labels-->
                                    <div class="row">
                                        <div class="col-md-auto">
                                            <h5 class="text-muted"> Labels: </h5>
                                        </div>

                                        <div class="col-md-auto"  v-for="(categ, categind) in result.amazonRekog.labels.Labels">
                                            <div style="display:flex; align-items: baseline;">
                                                <h5 > {{categ.Name}}</h5>
                                                <span class="badge badge-info ml-2">{{Math.round(categ.Confidence)}}%</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <!--IBM RESULTS-->
                                <div class="tab-pane fade" :id="'nav-ibm' + index" role="tabpanel" aria-labelledby="nav-ibm-tab">


                                    <!--This shows IBM Classifiers-->
                                    <div>
                                        <div class="col">
                                            <h5 class="text-muted"> Classifiers: </h5>
                                        </div>



                                        <table class="table table-light table-secondary">
                                        <tbody>


                                        <tr  v-for="(categ, categind) in result.ibmwatson.main.classifiers[0].classes">




                                            <th><h5 class="text-info"> {{categ.class}}</h5> </th>
                                            <th> <h6 class="text-muted pl-2 pr-2">({{categ.type_hierarchy}}) </h6></th>
                                            <th class="col-8"><div>
                                                        <div class="progress" style="height: 22px">
                                                            <div class="progress-bar" role="progressbar"  v-bind:style="{'width': categ.score * 100 + '%'}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"> {{ categ.score | toPercentage}}</div>
                                                        </div>
                                                    </div></th>
                                        </tr>

                                        </tbody>
                                        </table>


                                    </div>



                                </div>
                            </div>

                        </div>




                        </div>

                    </div>




                </div>


        </div>
    </div>
</div>
<!--// scripts-->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://unpkg.com/vue"></script>
<script src="app.js"></script>

<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.3.0/ekko-lightbox.js"></script>
<!--//end scripts-->

<script>
    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });

</script>


</body>
</html>


