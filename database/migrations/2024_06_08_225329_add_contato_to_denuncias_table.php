<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('denuncias', function (Blueprint $table) {
            $table->string('contato')->nullable()->after('localizacao');
        });
    }

    public function down()
    {
        Schema::table('denuncias', function (Blueprint $table) {
            $table->dropColumn('contato');
        });
    }
}; 