<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Laravel\Sanctum\Sanctum;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ApiRoutesTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_user_unauthenticated(): void
    {
        $response = $this->getJson('/api/user');

        $response->assertStatus(401);
    }

    public function test_get_user_authenticated(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $response = $this->getJson('/api/user');

        $response->assertStatus(200);
    }

    public function test_get_tasks_unauthenticated(): void
    {
        $response = $this->getJson('/api/tasks');

        $response->assertStatus(401);
    }

    public function test_get_tasks_owned(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $response = $this->getJson('/api/tasks');

        $response->assertStatus(200);
    }

    public function test_post_task_unauthenticated(): void
    {
        $response = $this->postJson('/api/tasks');

        $response->assertStatus(401);
    }

    public function test_post_task_incomplete_request_data(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $response = $this->postJson('/api/tasks');

        $response->assertStatus(422);
    }

    public function test_post_task_incorrect_request_data(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $response = $this->postJson('/api/tasks', [
            'title'         => 'Test Title',
            'description'   => 'Test Description',
            'status'        => 'On Going', // valid: Todo | In Progress | Done
            'due_at'        => now()
        ]);

        $response->assertStatus(422);
    }

    public function test_post_task_correct_request_data(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $data = [
            'title'         => 'Test Title',
            'description'   => 'Test Description',
            'status'        => 'Todo',
            'due_at'        => now()
        ];
        $response = $this->postJson('/api/tasks', $data);

        $response->assertStatus(201);
        $response->assertJsonStructure([
            'data' => ['id', 'title', 'description', 'status', 'due_at'],
        ]);
    }

    public function test_get_task_by_id_unauthenticated(): void
    {
        $response = $this->getJson('/api/tasks/1');

        $response->assertStatus(401);
    }

    public function test_get_task_by_id_owned(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $task = $user->tasks()->create($data = [
            'title'         => 'Test Title',
            'description'   => 'Test Description',
            'status'        => 'Todo',
            'due_at'        => now()
        ]);

        $response = $this->getJson('/api/tasks/' . $task->id);

        $response->assertStatus(200);
    }

    public function test_get_task_by_id_not_owned(): void
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();
        Sanctum::actingAs($user);
        $task = $user2->tasks()->create($data = [
            'title'         => 'Test Title',
            'description'   => 'Test Description',
            'status'        => 'Todo',
            'due_at'        => now()
        ]);

        $response = $this->getJson('/api/tasks/' . $task->id);

        $response->assertStatus(404);
    }

    public function test_get_task_by_id_not_existing(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->getJson('/api/tasks/fakeId');

        $response->assertStatus(404);
    }

    public function test_patch_task_unauthenticated()
    {
        $user = User::factory()->create();
        $task = $user->tasks()->create($data = [
            'title'         => 'Test Title',
            'description'   => 'Test Description',
            'status'        => 'Todo',
            'due_at'        => now(),
        ]);
        $response = $this->putJson('/api/tasks/' . $task->id);

        $response->assertStatus(401);
    }

    public function test_patch_task_incomplete_request_data()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $task = $user->tasks()->create($data = [
            'title'         => 'Test Title',
            'description'   => 'Test Description',
            'status'        => 'Todo',
            'due_at'        => now(),
        ]);
        $response = $this->putJson('/api/tasks/' . $task->id, []);

        $response->assertStatus(422);
    }

    public function test_patch_task_incorrect_request_data()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $task = $user->tasks()->create($data = [
            'title'         => 'Test Title',
            'description'   => 'Test Description',
            'status'        => 'Todo',
            'due_at'        => now(),
        ]);
        $response = $this->putJson('/api/tasks/' . $task->id, [
            'title'         => 1000, // Should be string
            'description'   => 'Test Description',
            'status'        => 'Todo',
            'due_at'        => now(),
        ]);

        $response->assertStatus(422);
    }

    public function test_patch_task_correct_request_data()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $task = $user->tasks()->create($data = [
            'title'         => 'Test Title',
            'description'   => 'Test Description',
            'status'        => 'Todo',
            'due_at'        => now(),
        ]);
        $response = $this->putJson('/api/tasks/' . $task->id, [
            'title'         => 'Updated',
            'description'   => 'Test Description',
            'status'        => 'Todo',
            'due_at'        => now(),
        ]);

        $response->assertStatus(200);
    }

    public function test_patch_task_not_owned()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();
        Sanctum::actingAs($user);
        $task = $user2->tasks()->create($data = [
            'title'         => 'Test Title',
            'description'   => 'Test Description',
            'status'        => 'Todo',
            'due_at'        => now(),
        ]);
        $response = $this->putJson('/api/tasks/' . $task->id, [
            'title'         => 'Updated',
            'description'   => 'Test Description',
            'status'        => 'Todo',
            'due_at'        => now(),
        ]);

        $response->assertStatus(403);
    }

    public function test_patch_task_not_existing()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $response = $this->putJson('/api/tasks/fakeId', [
            'title'         => 'Updated',
            'description'   => 'Test Description',
            'status'        => 'Todo',
            'due_at'        => now(),
        ]);

        $response->assertStatus(404);
    }

    public function test_delete_task_unauthenticated()
    {
        $response = $this->deleteJson('/api/tasks/1');

        $response->assertStatus(401);
    }

    public function test_delete_task_not_existing()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $response = $this->deleteJson('/api/tasks/fakeId');

        $response->assertStatus(404);
    }

    public function test_delete_task_not_owned()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();
        Sanctum::actingAs($user);
        $task = $user2->tasks()->create($data = [
            'title'         => 'Test Title',
            'description'   => 'Test Description',
            'status'        => 'Todo',
            'due_at'        => now(),
        ]);

        $response = $this->deleteJson('/api/tasks/' . $task->id);

        $response->assertStatus(404);
    }

    public function test_delete_task_owned()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $task = $user->tasks()->create($data = [
            'title'         => 'Test Title',
            'description'   => 'Test Description',
            'status'        => 'Todo',
            'due_at'        => now(),
        ]);
        $response = $this->deleteJson('/api/tasks/' . $task->id);

        $response->assertStatus(200);
    }
}
