<?php

namespace Database\Seeders;

use App\Models\Denuncia;
use App\Models\User;
use Illuminate\Database\Seeder;

class DenunciaSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first() ?? User::factory()->create();

        $denuncias = [
            [
                'titulo' => 'Buraco na Rua Principal',
                'descricao' => 'Existe um buraco grande na rua principal que está causando acidentes.',
                'localizacao' => 'Rua Principal, 123',
                'status' => 'pendente',
                'usuario_id' => $user->id
            ],
            [
                'titulo' => 'Lixeira Transbordando',
                'descricao' => 'A lixeira do bairro está transbordando há vários dias.',
                'localizacao' => 'Rua das Flores, 456',
                'status' => 'em_analise',
                'usuario_id' => $user->id
            ],
            [
                'titulo' => 'Poste de Luz Quebrado',
                'descricao' => 'Poste de luz quebrado na esquina da rua.',
                'localizacao' => 'Avenida Central, 789',
                'status' => 'resolvida',
                'usuario_id' => $user->id
            ]
        ];

        foreach ($denuncias as $denuncia) {
            Denuncia::create($denuncia);
        }
    }
} 