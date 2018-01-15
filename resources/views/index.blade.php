<!doctype html>
<html lang="{{ app()->getLocale() }}">

    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">

        <title>React - CRUD</title>

    </head>

    <body id="body" class="">

        <div id="admin"></div>
        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
            {{ csrf_field() }}
        </form>
        <script src="{{ asset('js/app.js') }}"></script>

    </body>

</html>
