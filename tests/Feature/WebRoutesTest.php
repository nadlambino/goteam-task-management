<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

class WebRoutesTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_ok_if_unauthenticated(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    public function test_login_redirect_if_authenticated(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $response = $this->get('/login');

        $response->assertStatus(302);
    }

    public function test_homepage_redirect_if_unauthenticated(): void
    {
        $response = $this->get('/');

        $response->assertStatus(302);
    }

    public function test_homepage_ok_if_authenticated(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
